import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {remove, render, replaceElement} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldFilmComponent = this._filmCard;
    const oldPopupComponent = this._filmPopup;

    const popupRenderPlace = this._container.closest(`.main`);

    this._filmCard = new FilmCard(film);
    this._filmPopup = new FilmPopup(film, popupRenderPlace);

    const onPopupCloseClick = () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
      remove(this._filmPopup);
    };

    const onFilmCardClick = () => {
      if (oldPopupComponent && popupRenderPlace.querySelector(`.film-details`)) {
        replaceElement(popupRenderPlace, this._filmPopup, oldPopupComponent);
      } else {
        render(popupRenderPlace, this._filmPopup.getElement(), RenderPosition.BEFORE_END);
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
      replaceElement(this._container, this._filmCard, oldFilmComponent);
    } else {
      render(this._container, this._filmCard.getElement(), RenderPosition.BEFORE_END);
    }
  }
}
