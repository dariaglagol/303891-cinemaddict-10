import FilmsList from '../components/films-lists';
import TopFilm from "../components/top-film";
import ShowMoreButton from "../components/show-more-button";
import NoData from "../components/no-data";
import MovieController from './movie-controller';
import Sorting from "../components/sorting";
import {remove, render} from "../utilities/render";
import {
  CARDS_COUNT,
  RenderPosition,
  TopFilmType,
  TOTAL_FILM_COUNT,
  RATES_CARDS_COUNT,
  SortTypeCallbacks
} from "../mocks/constants";


const renderFilms = (films, filmRenderPlace, sliceCount, slicePoint = 0) => {
  const movieController = new MovieController(filmRenderPlace);
  films.slice(slicePoint, slicePoint + sliceCount).forEach((film) => {
    movieController.render(film);
  });
};

const renderButton = (renderPlace, button) => {
  render(renderPlace, button.getElement(), RenderPosition.BEFORE_END);
};

const addFilms = (button, slicePoint, films, filmsRenderPlace, popupRenderPlace) => {
  button.setShowMoreButtonClickHandler(() => {
    slicePoint = slicePoint <= TOTAL_FILM_COUNT - CARDS_COUNT
      ? slicePoint + CARDS_COUNT
      : TOTAL_FILM_COUNT;

    if (slicePoint + CARDS_COUNT > TOTAL_FILM_COUNT) {
      remove(button);
    }

    renderFilms(films, popupRenderPlace, CARDS_COUNT, slicePoint);
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

      renderFilms(sortedFilms, filmsRenderPlace, CARDS_COUNT, startPointSlice);

      const ratedFilms = new TopFilm(generatedFilms, TopFilmType.RATING);
      const mostCommentedFilms = new TopFilm(generatedFilms, TopFilmType.COMMENTS);

      render(topRatedRenderPlace, ratedFilms.getElement(), RenderPosition.BEFORE_END);
      render(topRatedRenderPlace, mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

      const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
      const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      renderFilms(ratedFilms.getTopFilms(), ratingPlace, RATES_CARDS_COUNT);
      renderFilms(mostCommentedFilms.getTopFilms(), commentsPlace, RATES_CARDS_COUNT);

      this._sorting.setSortTypeChangeHandler((sortType) => {
        sortedFilms = generatedFilms.slice().sort(SortTypeCallbacks[sortType.toUpperCase()]);

        filmsRenderPlace.innerHTML = ``;

        renderFilms(sortedFilms, this._container, CARDS_COUNT);
        startPointSlice = 0;
        renderButton(buttonRenderPlace, this._showMoreButton);
        addFilms(this._showMoreButton, startPointSlice, sortedFilms, filmsRenderPlace, this._container);
      });

      renderButton(buttonRenderPlace, this._showMoreButton);
      addFilms(this._showMoreButton, startPointSlice, sortedFilms, filmsRenderPlace, this._container);
    }
  }
}
