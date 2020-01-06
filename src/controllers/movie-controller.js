import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {remove, render} from "../utilities/render";
import {CLICKABLE_ITEMS, RenderPosition} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(film) {
    const popupRenderPlace = this._container.closest(`.main`);

    const card = new FilmCard(film);
    const filmPopup = new FilmPopup(film, popupRenderPlace);

    const onPopupCloseClick = () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
      remove(filmPopup);
    };

    const onFilmCardClick = () => {
      render(popupRenderPlace, filmPopup.getElement(), RenderPosition.BEFORE_END);

      filmPopup.renderFormElement();
      filmPopup.setPopupCloseHandler(onPopupCloseClick);

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        document.removeEventListener(`keydown`, onEscKeyDown);
        remove(filmPopup);
      }
    };

    setCardClickEventListeners(CLICKABLE_ITEMS, card, onFilmCardClick);

    render(this._container, card.getElement(), RenderPosition.BEFORE_END);
  }
}
