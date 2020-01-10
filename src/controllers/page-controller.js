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

const renderButton = (renderPlace, button) => {
  render(renderPlace, button.getElement(), RenderPosition.BEFORE_END);
};

export default class PageController {
  constructor(container) {
    this._generatedFilms = [];
    this._showedFilmControllers = [];
    this._container = container;
    this._showMoreButton = new ShowMoreButton();
    this._sorting = new Sorting();
    this._filmList = new FilmsList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _createShowedFilmControllers(sortedFilms, filmsRenderPlace, counter = CARDS_COUNT, startPointSlice = 0) {
    const films = this._createFilms(sortedFilms, filmsRenderPlace, counter, this._onDataChange, this._onViewChange, startPointSlice);
    this._showedFilmControllers = this._showedFilmControllers.concat(films);
  }

  render(generatedFilms) {
    this._generatedFilms = generatedFilms;

    render(this._container, this._sorting.getElement(), RenderPosition.BEFORE_END);
    render(this._container, this._filmList.getElement(), RenderPosition.BEFORE_END);

    const topRatedRenderPlace = this._container.querySelector(`.films`);
    const buttonRenderPlace = this._container.querySelector(`.films-list`);
    const filmsRenderPlace = this._container.querySelector(`.films-list__container`);

    let sortedFilms = this._generatedFilms.slice();

    if (this._generatedFilms.length < 1) {
      render(buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
    } else {
      let startPointSlice = 0;

      this._createShowedFilmControllers(sortedFilms, filmsRenderPlace);

      const ratedFilms = new TopFilm(this._generatedFilms, TopFilmType.RATING);
      const mostCommentedFilms = new TopFilm(this._generatedFilms, TopFilmType.COMMENTS);

      render(topRatedRenderPlace, ratedFilms.getElement(), RenderPosition.BEFORE_END);
      render(topRatedRenderPlace, mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

      const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
      const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      this._createShowedFilmControllers(ratedFilms.getTopFilms(), ratingPlace, RATES_CARDS_COUNT);
      this._createShowedFilmControllers(mostCommentedFilms.getTopFilms(), commentsPlace);

      this._onSortTypeChange(sortedFilms, filmsRenderPlace, buttonRenderPlace);

      renderButton(buttonRenderPlace, this._showMoreButton);
      this._addFilms(this._showMoreButton, startPointSlice, sortedFilms, filmsRenderPlace);
    }
  }

  _onDataChange(movieController, newFilm, oldFilm) {
    const index = this._generatedFilms.findIndex((it) => it === oldFilm);

    if (index === -1) {
      return;
    }

    this._generatedFilms = [].concat(this._generatedFilms.slice(0, index), newFilm, this._generatedFilms.slice(index + 1));

    movieController.render(this._generatedFilms[index]);
  }

  _createFilms(films, filmRenderPlace, sliceCount, onDataChange, onViewChange, slicePoint = 0) {
    return films.slice(slicePoint, slicePoint + sliceCount).map((film) => {
      const movieController = new MovieController(filmRenderPlace, onDataChange, onViewChange);
      movieController.render(film);

      return movieController;
    });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
    this._showedFilmControllers.forEach((it) => it.removeEscDownListener());
  }

  _onSortTypeChange(sortedFilms, filmsRenderPlace, buttonRenderPlace) {
    this._sorting.setSortTypeChangeHandler((sortType) => {
      sortedFilms = this._generatedFilms.slice().sort(SortTypeCallbacks[sortType]);

      filmsRenderPlace.innerHTML = ``;

      this._showedFilmControllers = this._createFilms(sortedFilms, filmsRenderPlace, CARDS_COUNT, this._onDataChange, this._onViewChange);

      renderButton(buttonRenderPlace, this._showMoreButton);
    });
  }

  _addFilms(button, slicePoint, films, filmsRenderPlace) {
    button.setShowMoreButtonClickHandler(() => {
      slicePoint = slicePoint <= TOTAL_FILM_COUNT - CARDS_COUNT
        ? slicePoint + CARDS_COUNT
        : TOTAL_FILM_COUNT;

      if (slicePoint + CARDS_COUNT > TOTAL_FILM_COUNT) {
        remove(button);
      }

      this._createShowedFilmControllers(films, filmsRenderPlace, CARDS_COUNT, slicePoint);
    });
  }
}
