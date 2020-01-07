import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {remove, render, replaceElement} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition, Mode} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._oldPopupComponent = null;
  }

  render(film) {
    const oldFilmComponent = this._filmCard;

    this._popupRenderPlace = this._container.closest(`.main`);

    this._filmCard = new FilmCard(film);
    this._filmPopup = new FilmPopup(film, this._popupRenderPlace);

    const onPopupCloseClick = () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
      remove(this._filmPopup);
    };

    const onFilmCardClick = () => {
      this._oldPopupComponent = this._popupRenderPlace.querySelector(`.film-details`);
      if (this._oldPopupComponent) {
        this._replacePopup();
      } else {
        render(this._popupRenderPlace, this._filmPopup.getElement(), RenderPosition.BEFORE_END);
      }

      this._filmPopup.setPopupCloseHandler(onPopupCloseClick);

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        document.removeEventListener(`keydown`, onEscKeyDown);
        remove(this._filmPopup);
      }
    };

    this._filmCard.setWatchListButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isInWatchList: !film.isInWatchList,
      });

      this._onDataChange(this, newData, film);
    });

    this._filmCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isWatched: !film.isWatched,
      });

      this._onDataChange(this, newData, film);
    });

    this._filmCard.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();

      const newData = Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      });

      this._onDataChange(this, newData, film);
    });

    setCardClickEventListeners(CLICKABLE_ITEMS, this._filmCard, onFilmCardClick);

    if (oldFilmComponent) {
      replaceElement(this._container, this._filmCard.getElement(), oldFilmComponent.getElement());
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFORE_END);
    }
  }

  _replacePopup() {
    this._onViewChange();
    replaceElement(this._popupRenderPlace, this._filmPopup.getElement(), this._oldPopupComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopup();
    }
  }
}
