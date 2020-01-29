import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import CommentForm from "../components/comment-form";
import FilmModel from '../models/movies-model';
import {remove, render, replaceElement} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition, Mode, COMMENTS_AUTHORS} from "../mocks/constants";
import {getRandomArrayItem, getRandomIntegerNumber, setCardClickEventListeners, getRandomDate} from "../utilities/utilities";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

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

    const onPopupCloseClick = () => {
      this.removeEventsListener();
      remove(this._filmPopup);
    };

    const onFilmCardClick = () => {
      const replaceableElement = this._popupRenderPlace.querySelector(`.film-details`);
      if (replaceableElement) {
        this._replacePopup(replaceableElement);
      } else {
        render(this._popupRenderPlace, this._filmPopup.getElement(), RenderPosition.BEFORE_END);
        this._renderCommentsForm();
      }

      this._filmPopup.setPopupCloseHandler(onPopupCloseClick);

      document.addEventListener(`keydown`, this._setEscKeyDownHandler);
      document.addEventListener(`keydown`, this._commentSubmitHandler);
    };

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
        isWatched: !film.isWatched
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
    this.addEventsListener();
    this._renderCommentsForm();
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      const replaceableElement = this._popupRenderPlace.querySelector(`.film-details`);

      this._replacePopup(replaceableElement);
    }
  }

  removeEventsListener() {
    document.removeEventListener(`keydown`, this._setEscKeyDownHandler);
    document.removeEventListener(`keydown`, this._commentSubmitHandler);
  }

  addEventsListener() {
    document.addEventListener(`keydown`, this._setEscKeyDownHandler);
    document.addEventListener(`keydown`, this._commentSubmitHandler);
  }

  _setEscKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.removeEventsListener();
      remove(this._filmPopup);
    }
  }

  _commentSubmitHandler(evt) {
    const isCmdOrCtrlPressed = evt.metaKey || evt.ctrlKey;
    if (evt.key === `Enter` && isCmdOrCtrlPressed) {
      evt.preventDefault();

      const formData = this._filmPopup.getFormData();

      const newComment = {
        text: formData.commentTextAreaValue,
        author: getRandomArrayItem(COMMENTS_AUTHORS),
        emoji: formData.commentEmoji,
        date: getRandomDate(),
        id: getRandomIntegerNumber(this._film.comments.length, 1000)
      };

      const newComments = [].concat(this._film.comments, [newComment]);

      const newData = Object.assign({}, this._film, {
        comments: newComments
      });

      this._mode = Mode.EDIT;

      this._onDataChange(this, this._film.id, newData);
    }
  }

  _renderCommentsForm() {
    const commentFormRenderPlace = this._popupRenderPlace.querySelector(`.form-details__bottom-container`);
    render(commentFormRenderPlace, this._commentForm.getElement(), RenderPosition.BEFORE_END);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmPopup);
  }
}
