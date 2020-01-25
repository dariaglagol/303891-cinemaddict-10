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

export default class PageController {
  constructor(container, filmsModel) {
    this._filmsModel = filmsModel;
    this._generatedFilms = this._filmsModel.getFilms();

    this._showedFilmControllers = [];
    this._ratedFilmControllers = [];

    this._container = container;

    this._showMoreButton = new ShowMoreButton();
    this._sorting = new Sorting();
    this._filmList = new FilmsList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._updateFilmControllers = this._updateFilmControllers.bind(this);

    this._filmsModel.setFilterChangeHandler(this._updateFilmControllers);
  }

  _createShowedFilmControllers(sortedFilms, filmsRenderPlace, counter = CARDS_COUNT, startPointSlice = 0) {
    const films = this._createFilms(sortedFilms, filmsRenderPlace, counter, this._onDataChange, this._onViewChange, startPointSlice);
    this._showedFilmControllers = this._showedFilmControllers.concat(films);
  }

  _createRatedFilmsControllers(sortedFilms, filmsRenderPlace, counter = RATES_CARDS_COUNT, startPointSlice = 0) {
    const films = this._createFilms(sortedFilms, filmsRenderPlace, counter, this._onDataChange, this._onViewChange, startPointSlice);
    this._ratedFilmControllers = this._ratedFilmControllers.concat(films);
  }

  _renderButton(renderPlace, button, sortedFilms) {
    const showMoreButton = this._container.querySelector(`.films-list__show-more`);
    if (!showMoreButton) {
      render(renderPlace, button.getElement(), RenderPosition.BEFORE_END);
      this._addFilms(this._showMoreButton, sortedFilms, this._filmsRenderPlace);
    }
  }

  render() {
    render(this._container, this._sorting.getElement(), RenderPosition.BEFORE_END);
    render(this._container, this._filmList.getElement(), RenderPosition.BEFORE_END);

    this._buttonRenderPlace = this._container.querySelector(`.films-list`);
    this._filmsRenderPlace = this._container.querySelector(`.films-list__container`);

    const topRatedRenderPlace = this._container.querySelector(`.films`);

    if (this._generatedFilms.length < 1) {
      render(this._buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
    } else {
      this._createShowedFilmControllers(this._filmsModel.getFilms(), this._filmsRenderPlace);

      const ratedFilms = new TopFilm(this._generatedFilms, TopFilmType.RATING);
      const mostCommentedFilms = new TopFilm(this._generatedFilms, TopFilmType.COMMENTS);

      render(topRatedRenderPlace, ratedFilms.getElement(), RenderPosition.BEFORE_END);
      render(topRatedRenderPlace, mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

      const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
      const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

      this._createRatedFilmsControllers(ratedFilms.getTopFilms(), ratingPlace, RATES_CARDS_COUNT);
      this._createRatedFilmsControllers(mostCommentedFilms.getTopFilms(), commentsPlace);

      this._onSortTypeChange(this._filmsModel.getFilms(), this._filmsRenderPlace, this._buttonRenderPlace);

      if (this.shouldButtonRender()) {
        this._renderButton(this._buttonRenderPlace, this._showMoreButton, this._filmsModel.getFilms());
      } else {
        remove(this._showMoreButton);
      }
    }
  }

  _onDataChange(movieController, id, film) {
    const isSuccess = this._filmsModel.refreshFilm(id, film);

    if (isSuccess) {
      movieController.render(film);
    }
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
    this._showedFilmControllers.forEach((it) => it.removeEventsListener());
  }

  _onSortTypeChange(films, filmsRenderPlace, buttonRenderPlace) {
    this._sorting.setSortTypeChangeHandler((sortType) => {
      const sortedFilms = this._generatedFilms.slice().sort(SortTypeCallbacks[sortType]);

      filmsRenderPlace.innerHTML = ``;

      this._showedFilmControllers = this._createFilms(sortedFilms, filmsRenderPlace, CARDS_COUNT, this._onDataChange, this._onViewChange);

      this._renderButton(buttonRenderPlace, this._showMoreButton, sortedFilms);
    });
  }

  _addFilms(button, films, filmsRenderPlace, slicePoint = 0) {
    button.setShowMoreButtonClickHandler(() => {
      const filmsLength = this._filmsModel.getFilms().length;
      slicePoint = slicePoint <= filmsLength - CARDS_COUNT
        ? slicePoint + CARDS_COUNT
        : TOTAL_FILM_COUNT;

      if (slicePoint + CARDS_COUNT > filmsLength) {
        remove(button);
      }

      this._createShowedFilmControllers(this._filmsModel.getFilms(), filmsRenderPlace, CARDS_COUNT, slicePoint);
    });
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilmControllers() {
    this._removeFilms();
    const films = this._filmsModel.getFilms();
    this._createShowedFilmControllers(films, this._filmsRenderPlace);

    if (this.shouldButtonRender()) {
      this._renderButton(this._buttonRenderPlace, this._showMoreButton, films);
    } else if (this._filmsModel.getFilms().length <= CARDS_COUNT) {
      remove(this._showMoreButton);
    }
  }

  shouldButtonRender() {
    return this._filmsModel.getFilms().length > CARDS_COUNT;
  }
}
