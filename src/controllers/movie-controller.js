import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import CommentForm from "../components/comment-form";
import FilmModel from '../models/movies-model';
import Comments from "../components/comments";
import CommentModel from "../models/comment-model";
import MovieModel from "../models/movie-model";
import {remove, render, replaceElement} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition, Mode, COMMENTS_AUTHORS} from "../mocks/constants";
import {getRandomArrayItem, getRandomIntegerNumber, setCardClickEventListeners, getRandomDate} from "../utilities/utilities";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this._setEscKeyDownHandler = this._setEscKeyDownHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._filmModel = new FilmModel();
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
        this._replacePopup(replaceableElement);
        this.setPopupEventsListener();
      } else {
        this._api.getComments(this._film.id)
          .then((comments) => {
            this._film.commentsData = comments;
            this._commentsComponent.getComments(this._film.commentsData);
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

  _replacePopup(replaceableElement) {
    this._onViewChange();
    replaceElement(this._filmPopup.getElement(), replaceableElement);
    this.setPopupEventsListener();
    this._renderCommentsForm();
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      const replaceableElement = this._popupRenderPlace.querySelector(`.film-details`);

      this._replacePopup(replaceableElement);
    }
  }

  setCardsListeners() {
    const film = this._film;
    this._filmCard.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isInWatchList: !film.isInWatchList,
      });

      this._onDataChange(this, film.id, newData);
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isWatched: !film.isWatched,
        watchingDate: !film.isWatched ? new Date() : film.watchingDate
      });

      this._onDataChange(this, film.id, newData);
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      });

      this._onDataChange(this, film.id, newData);
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

    this._filmPopup.setPopupCloseHandler((evt) => {
      evt.preventDefault();
      this.removePopupEventsListener();
      remove(this._filmPopup);
    });

    this._filmPopup.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isInWatchList: !film.isInWatchList,
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, newData);
    });

    this._filmPopup.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isWatched: !film.isWatched,
        watchingDate: !film.isWatched ? new Date() : film.watchingDate
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, newData);
    });

    this._filmPopup.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, newData);
    });

    this._filmPopup.setDeleteButtonClickHandler((id) => {
      const newData = Object.assign({}, film, {
        comments: this._filmModel.removeComment(film, id)
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, film.id, newData);
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

      console.log(this._film.comments, this._film.commentsData);

      const film = new MovieModel({
        'user_details': {
          'favorite': this._film.isFavorite,
          'already_watched': this._film.isWatched,
          'watchlist': this._film.isInWatchList,
          'personal_rating': this._film.personalRating,
          'watching_date': this._film.watchingDate.toISOString(),
        },
        'film_info': {
          'title': this._film.filmName,
          'alternative_title': this._film.alternativeFilmName,
          'total_rating': this._film.rating,
          'poster': this._film.posterUrl,
          'release': {
            'date': this._film.releaseDate,
            'release_country': this._film.country
          },
          'runtime': this._film.movieDuration,
          'genre': this._film.genres,
          'description': this._film.description,
          'age_rating': this._film.ageRating,
          'actors': this._film.actors,
          'writers': this._film.writers,
          'director': this._film.director,
        },
        'comments': this._film.comments,
        'id': this._film.id,
      });

      const newComment = new CommentModel({
        comment: formData.commentTextAreaValue,
        author: getRandomArrayItem(COMMENTS_AUTHORS),
        emotion: formData.commentEmoji,
        date: new Date(),
        id: getRandomIntegerNumber(film.comments.length, 1000).toString()
      });

      const newComments = [].concat(this._film.commentsData, [newComment]);

      const newData = {
        movie: film,
        comments: newComments
      };

      this._mode = Mode.EDIT;

      this._api.addComment(this._film.id, newData)
        .then(() => {
          this._onDataChange(this, this._film.id, newData);
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
