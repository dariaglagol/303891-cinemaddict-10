import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup-template";
import TopFilm from "../components/top-film";
import ShowMoreButton from "../components/show-more-button";
import NoData from "../components/no-data";
import {remove, render} from "../utilities/render";
import {
  CARDS_COUNT,
  CLICKABLE_ITEMS,
  RATES_CARDS_COUNT,
  RenderPosition,
  TopFilmTypes,
  TOTAL_FILM_COUNT,
} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";

const renderFilm = (film, filmRenderPlace, popupRenderPlace) => {
  const card = new FilmCard(film);
  const filmPopup = new FilmPopup(film, popupRenderPlace);

  const onClosePopup = () => {
    filmPopup.getElement().remove();
    filmPopup.removeElement();

    document.removeEventListener(`keydown`, onClosePopup);
  };

  const onOpenPopup = () => {
    render(popupRenderPlace, filmPopup.getElement(), RenderPosition.BEFORE_END);
    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    filmPopup.renderFormElement();
    closePopupButton.addEventListener(`click`, onClosePopup);

    document.addEventListener(`keydown`, onClosePopup);
  };

  setCardClickEventListeners(CLICKABLE_ITEMS, card, onOpenPopup);

  render(filmRenderPlace, card.getElement(), RenderPosition.BEFORE_END);
};

const renderFilms = (films, filmRenderPlace, popupRenderPlace, sliceCount, slicePoint = 0) => {
  films.slice(slicePoint, slicePoint + sliceCount).forEach((film) => {
    renderFilm(film, filmRenderPlace, popupRenderPlace);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButton = new ShowMoreButton();
  }

  render(generatedFilms) {
    const topRatedRenderPlace = this._container.querySelector(`.films`);
    const buttonRenderPlace = this._container.querySelector(`.films-list`);
    const filmsRenderPlace = this._container.querySelector(`.films-list__container`);

    if (generatedFilms.length < 1) {
      render(buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
    } else {
      let startPointSlice = 0;
      renderFilms(generatedFilms, filmsRenderPlace, this._container, CARDS_COUNT, startPointSlice);

      const ratedFilms = new TopFilm(generatedFilms, TopFilmTypes.RATING);
      const mostCommentedFilms = new TopFilm(generatedFilms, TopFilmTypes.COMMENTS);

      render(topRatedRenderPlace, ratedFilms.getElement(), RenderPosition.BEFORE_END);
      render(topRatedRenderPlace, mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

      const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
      const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      renderFilms(ratedFilms.getTopFilms(), ratingPlace, this._container, RATES_CARDS_COUNT);
      renderFilms(mostCommentedFilms.getTopFilms(), commentsPlace, this._container, RATES_CARDS_COUNT);

      render(buttonRenderPlace, this._showMoreButton.getElement(), RenderPosition.BEFORE_END);

      this._showMoreButton.setShowMoreButtonClickHandler(() => {
        startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
          ? startPointSlice + CARDS_COUNT
          : TOTAL_FILM_COUNT;

        if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
          remove(this._showMoreButton);
        }

        renderFilms(generatedFilms, filmsRenderPlace, this._container, CARDS_COUNT, startPointSlice);
      });
    }
  }
}
