import FilmsList from '../components/films-lists';
import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import TopFilm from "../components/top-film";
import ShowMoreButton from "../components/show-more-button";
import NoData from "../components/no-data";
import Sorting from "../components/sorting";
import {remove, render} from "../utilities/render";
import {
  CARDS_COUNT,
  CLICKABLE_ITEMS,
  RATES_CARDS_COUNT,
  RenderPosition,
  TopFilmType,
  TOTAL_FILM_COUNT,
  SortType
} from "../mocks/constants";
import {setCardClickEventListeners} from "../utilities/utilities";

const renderFilm = (film, filmRenderPlace, popupRenderPlace) => {
  const card = new FilmCard(film);
  const filmPopup = new FilmPopup(film, popupRenderPlace);

  const onPopupCloseClick = () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
    remove(filmPopup);
  };

  const onFilmCardClick = () => {
    render(popupRenderPlace, filmPopup.getElement(), RenderPosition.BEFORE_END);

    filmPopup.renderFormElement();
    filmPopup.onPopupClose(onPopupCloseClick);

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

  render(filmRenderPlace, card.getElement(), RenderPosition.BEFORE_END);
};

const renderFilms = (films, filmRenderPlace, popupRenderPlace, sliceCount, slicePoint = 0) => {
  films.slice(slicePoint, slicePoint + sliceCount).forEach((film) => {
    renderFilm(film, filmRenderPlace, popupRenderPlace);
  });
};

const renderButton = (renderPlace, button) => {
  render(renderPlace, button.getElement(), RenderPosition.BEFORE_END);
};

const onShowMoreButtonClick = (button, slicePoint, films, filmsRenderPlace, popupRenderPlace) => {
  button.setShowMoreButtonClickHandler(() => {
    slicePoint = slicePoint <= TOTAL_FILM_COUNT - CARDS_COUNT
      ? slicePoint + CARDS_COUNT
      : TOTAL_FILM_COUNT;

    if (slicePoint + CARDS_COUNT > TOTAL_FILM_COUNT) {
      remove(button);
    }

    renderFilms(films, filmsRenderPlace, popupRenderPlace, CARDS_COUNT, slicePoint);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButton = new ShowMoreButton();
    this._sorting = new Sorting();
    this._filmList = new FilmsList();
  }

  render(generatedFilms) {
    render(this._container, this._sorting.getElement(), RenderPosition.BEFORE_END);
    render(this._container, this._filmList.getElement(), RenderPosition.BEFORE_END);

    const topRatedRenderPlace = this._container.querySelector(`.films`);
    const buttonRenderPlace = this._container.querySelector(`.films-list`);
    const filmsRenderPlace = this._container.querySelector(`.films-list__container`);

    let sortedFilms = generatedFilms.slice();

    if (generatedFilms.length < 1) {
      render(buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
    } else {
      let startPointSlice = 0;

      renderFilms(sortedFilms, filmsRenderPlace, this._container, CARDS_COUNT, startPointSlice);

      const ratedFilms = new TopFilm(generatedFilms, TopFilmType.RATING);
      const mostCommentedFilms = new TopFilm(generatedFilms, TopFilmType.COMMENTS);

      render(topRatedRenderPlace, ratedFilms.getElement(), RenderPosition.BEFORE_END);
      render(topRatedRenderPlace, mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

      const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
      const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      renderFilms(ratedFilms.getTopFilms(), ratingPlace, this._container, RATES_CARDS_COUNT);
      renderFilms(mostCommentedFilms.getTopFilms(), commentsPlace, this._container, RATES_CARDS_COUNT);

      this._sorting.setSortTypeChangeHandler((sortType) => {
        switch (sortType) {
          case SortType.DATE:
            sortedFilms = generatedFilms.slice().sort((a, b) => b.releaseYear - a.releaseYear);
            break;
          case SortType.RATING:
            sortedFilms = generatedFilms.slice().sort((a, b) => b.rating - a.rating);
            break;
          case SortType.DEFAULT:
            sortedFilms = generatedFilms.slice();
            break;
        }

        filmsRenderPlace.innerHTML = ``;

        renderFilms(sortedFilms, filmsRenderPlace, this._container, CARDS_COUNT);
        startPointSlice = 0;
        renderButton(buttonRenderPlace, this._showMoreButton);
        onShowMoreButtonClick(this._showMoreButton, startPointSlice, sortedFilms, filmsRenderPlace, this._container);
      });

      renderButton(buttonRenderPlace, this._showMoreButton);
      onShowMoreButtonClick(this._showMoreButton, startPointSlice, sortedFilms, filmsRenderPlace, this._container);
    }
  }
}
