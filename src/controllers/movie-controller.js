import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import CommentForm from "../components/comment-form";
import Comments from "../components/comments";
import CommentModel from "../models/comment-model";
import {remove, render, replaceElement} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition, Mode} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";
import MovieModel from "../models/movie-model";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this._setEscKeyDownHandler = this._setEscKeyDownHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmCard;
    const oldPopupComponent = this._filmPopup;
    this._film = film;
    this._popupRenderPlace = this._container.closest(`.main`);

    this._filmCard = new FilmCard(film);
    this._filmPopup = new FilmPopup(film);
    this._commentForm = new CommentForm();
    this._commentsComponent = new Comments();

    const onFilmCardClick = () => {
      const replaceableElement = this._popupRenderPlace.querySelector(`.film-details`);
      if (replaceableElement) {
        this._getFilmsComment()
          .then(()=> {
            this._renderCommentsForm();
            this.setPopupEventsListener();
          });
      } else {
        this._getFilmsComment()
          .then(() => {
            render(this._popupRenderPlace, this._filmPopup.getElement(), RenderPosition.BEFORE_END);
            this._renderCommentsForm();
            this.setPopupEventsListener();
          });
      }
    };

    this.setCardsListeners();

    setCardClickEventListeners(CLICKABLE_ITEMS, this._filmCard, onFilmCardClick);

    if (oldFilmComponent) {
      replaceElement(this._filmCard.getElement(), oldFilmComponent.getElement());
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFORE_END);
    }

    if (oldPopupComponent && this._mode !== Mode.DEFAULT) {
      this._mode = Mode.DEFAULT;
      this._replacePopup(oldPopupComponent.getElement());
    }
  }

  _getFilmsComment() {
    return this._api.getComments(this._film.id)
      .then((comments) => {
        this._film.commentsData = comments;
        this._commentsComponent.getComments(this._film.commentsData);
      });
  }

  _replacePopup(replaceableElement) {
    this._getFilmsComment()
      .then(() => {
        this._onViewChange();
        replaceElement(this._filmPopup.getElement(), replaceableElement);
        this._renderCommentsForm();
        this.setPopupEventsListener();
        this._mode = Mode.DEFAULT;
      });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      const replaceableElement = this._popupRenderPlace.querySelector(`.film-details`);

      this._replacePopup(replaceableElement);
    }
  }

  setCardsListeners() {
    const film = this._film;
    const shouldAppUpdate = true;

    this._filmCard.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isInWatchList = !film.isInWatchList;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isWatched = !film.isWatched;
      film.watchingDate = !film.isWatched ? new Date().toISOString() : film.watchingDate;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isFavorite = !film.isFavorite;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });
  }

  removePopupEventsListener() {
    document.removeEventListener(`keydown`, this._setEscKeyDownHandler);
    document.removeEventListener(`keydown`, this._commentSubmitHandler);
  }

  setPopupEventsListener() {
    document.addEventListener(`keydown`, this._setEscKeyDownHandler);
    document.addEventListener(`keydown`, this._commentSubmitHandler);

    const film = this._film;

    const shouldAppUpdate = true;

    this._filmPopup.setPopupCloseHandler((evt) => {
      evt.preventDefault();
      this.removePopupEventsListener();
      remove(this._filmPopup);
    });

    this._filmPopup.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isInWatchList = !film.isInWatchList;

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmPopup.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isWatched = !film.isWatched;
      film.watchingDate = !film.isWatched ? new Date() : film.watchingDate;

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmPopup.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      film.isFavorite = !film.isFavorite;

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmPopup.setRatingButtonClickHandler((evt) => {
      evt.preventDefault();

      film.personalRating = parseInt(evt.target.value, 10);

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, film.toRAW(), shouldAppUpdate);
    });

    this._filmPopup.setDeleteButtonClickHandler((id) => {
      this._mode = Mode.EDIT;

      const rawFilm = this._film.toRAW();

      this._api.deleteComment(id)
        .then(() => {
          this._onDataChange(this, film.id, rawFilm);
        });
    });
  }

  _setEscKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.removePopupEventsListener();
      remove(this._filmPopup);
    }
  }

  _commentSubmitHandler(evt) {
    const isCmdOrCtrlPressed = evt.metaKey || evt.ctrlKey;
    if (evt.key === `Enter` && isCmdOrCtrlPressed) {
      evt.preventDefault();
      const formData = this._filmPopup.getFormData();

      if (!formData) {
        return;
      }

      const newComment = new CommentModel({
        comment: formData.encodedTextAreaValue,
        emotion: formData.commentEmoji,
        date: new Date(),
      });

      this._mode = Mode.EDIT;

      this._api.addComment(this._film.id, newComment)
        .then((film) => {
          const {movie} = film;
          this._onDataChange(this, this._film.id, movie);
        });
    }
  }

  _renderCommentsForm() {
    const commentsFormRenderPlace = this._popupRenderPlace.querySelector(`.film-details__inner`);
    render(commentsFormRenderPlace, this._commentsComponent.getElement(), RenderPosition.BEFORE_END);
    render(this._commentsComponent.getElement(), this._commentForm.getElement(), RenderPosition.BEFORE_END);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }
}
