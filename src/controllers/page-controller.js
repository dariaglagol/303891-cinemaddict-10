import FilmsList from '../components/films-lists';
import TopFilm from "../components/top-film";
import ShowMoreButton from "../components/show-more-button";
import NoData from "../components/no-data";
import MovieController from './movie-controller';
import Sorting from "../components/sorting";
import MovieModel from '../models/movie-model';
import {remove, render} from "../utilities/render";
import {
  CARDS_COUNT,
  RenderPosition,
  TopFilmType,
  RATES_CARDS_COUNT
} from "../mocks/constants";

export default class PageController {
  constructor(container, filmModel, filterController, api) {
    this._filmModel = filmModel;
    this._filterController = filterController;
    this._generatedFilms = this._filmModel.getFilms();
    this._api = api;

    this._showedFilmControllers = [];
    this._ratedFilmControllers = [];

    this._container = container;

    this._showMoreButton = new ShowMoreButton();
    this._sorting = new Sorting();
    this._filmList = new FilmsList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._updateFilmControllers = this._updateFilmControllers.bind(this);

    this._filmModel.setFilterChangeHandler(this._updateFilmControllers);
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

    if (this._generatedFilms.length < 1) {
      render(this._buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
    } else {
      this._createShowedFilmControllers(this._filmModel.getFilms(), this._filmsRenderPlace);

      this._renderRatedFilms();

      this._setSortTypeChangeHandler(this._filmModel.getFilms(), this._filmsRenderPlace, this._buttonRenderPlace);

      if (this.shouldButtonRender()) {
        this._renderButton(this._buttonRenderPlace, this._showMoreButton, this._filmModel.getFilms());
      } else {
        remove(this._showMoreButton);
      }
    }
  }

  _renderRatedFilms() {
    const films = this._filmModel.getAllFilms();
    const topRatedRenderPlace = this._container.querySelector(`.films`);
    this._ratedFilms = new TopFilm(films, TopFilmType.RATING);
    this._mostCommentedFilms = new TopFilm(films, TopFilmType.COMMENTS);

    render(topRatedRenderPlace, this._ratedFilms.getElement(), RenderPosition.BEFORE_END);
    render(topRatedRenderPlace, this._mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

    const ratingPlace = this._ratedFilms.getElement().querySelector(`.films-list__container`);
    const commentsPlace = this._mostCommentedFilms.getElement().querySelector(`.films-list__container`);

    this._createRatedFilmsControllers(this._ratedFilms.getTopFilms(films), ratingPlace, RATES_CARDS_COUNT);
    this._createRatedFilmsControllers(this._mostCommentedFilms.getTopFilms(films), commentsPlace, RATES_CARDS_COUNT);
  }

  _removeRatedFilms() {
    this._ratedFilmControllers.forEach((filmController) => filmController.destroy());
    this._ratedFilmControllers = [];
  }

  _updateRatedFilms() {
    const films = this._filmModel.getAllFilms();
    this._removeRatedFilms();

    const ratingPlace = this._ratedFilms.getElement().querySelector(`.films-list__container`);
    const commentsPlace = this._mostCommentedFilms.getElement().querySelector(`.films-list__container`);

    this._createRatedFilmsControllers(this._ratedFilms.getTopFilms(films), ratingPlace, RATES_CARDS_COUNT);
    this._createRatedFilmsControllers(this._mostCommentedFilms.getTopFilms(films), commentsPlace, RATES_CARDS_COUNT);
  }

  _onDataChange(movieController, id, film, userDetail = false) {
    const preparedFilm = new MovieModel(film);
    const isSuccess = this._filmModel.refreshFilm(id, preparedFilm);

    if (isSuccess) {
      if (userDetail) {
        const disabledValue = preparedFilm[userDetail];
        movieController.setActiveArea(userDetail);
        movieController.toggleDetailsRequestError({userDetail, disabledValue});

        this._api.updateFilm(id, preparedFilm)
          .then((movie) => {
            this._filterController.render(this._filmModel);
            movieController.render(movie);
            this._updateRatedFilms();
          })
          .catch(() => {
            movieController.toggleDetailsRequestError({userDetail, disabledValue}, `show`);
          });

        return;
      }

      movieController.render(preparedFilm);
      this._updateRatedFilms();
    }
  }

  _createFilms(films, filmRenderPlace, sliceCount, onDataChange, onViewChange, slicePoint = 0) {
    return films.slice(slicePoint, slicePoint + sliceCount).map((film) => {
      const movieController = new MovieController(filmRenderPlace, onDataChange, onViewChange, this._api);
      movieController.render(film);

      return movieController;
    });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
    this._showedFilmControllers.forEach((it) => it.removePopupEventsListener());
  }

  _setSortTypeChangeHandler(films, filmsRenderPlace, buttonRenderPlace) {
    this._sorting.setSortTypeChangeHandler((sortType) => {
      this._filmModel.setSorting(sortType);

      const sortedFilms = this._filmModel.getFilms();

      filmsRenderPlace.innerHTML = ``;

      this._showedFilmControllers = this._createFilms(sortedFilms, filmsRenderPlace, CARDS_COUNT, this._onDataChange, this._onViewChange);

      this._renderButton(buttonRenderPlace, this._showMoreButton, sortedFilms);
    });
  }

  _addFilms(button, films, filmsRenderPlace, slicePoint = 0) {
    button.setShowMoreButtonClickHandler(() => {
      const filmsLength = this._filmModel.getFilms().length;
      slicePoint = slicePoint <= filmsLength - CARDS_COUNT
        ? slicePoint + CARDS_COUNT
        : filmsLength;

      if (slicePoint + CARDS_COUNT >= filmsLength) {
        remove(button);
      }

      this._createShowedFilmControllers(this._filmModel.getFilms(), filmsRenderPlace, CARDS_COUNT, slicePoint);
    });
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilmControllers() {
    this._removeFilms();
    const films = this._filmModel.getFilms();
    this._createShowedFilmControllers(films, this._filmsRenderPlace);

    if (this.shouldButtonRender()) {
      this._renderButton(this._buttonRenderPlace, this._showMoreButton, films);
    } else if (this._filmModel.getFilms().length <= CARDS_COUNT) {
      remove(this._showMoreButton);
    }
  }

  shouldButtonRender() {
    return this._filmModel.getFilms().length > CARDS_COUNT;
  }

  hideMainPage() {
    this._sorting.hide();
    this._filmList.hide();
  }

  showMainPage() {
    this._sorting.show();
    this._filmList.show();
  }
}
