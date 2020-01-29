import moment from "moment";
import {FiltersName, SortTypeName, SortTypeCallbacks} from "../mocks/constants";
import {getFilmsByFilter} from "../utilities/filter";

export default class MoviesModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FiltersName.ALL;
    this._activeSortType = SortTypeName.DEFAULT;
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType)
      .sort(SortTypeCallbacks[this._activeSortType]);
  }

  getAllFilms() {
    return this._films;
  }

  setFilm(films) {
    this._films = Array.from(films);
  }

  refreshFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  removeComment(film, id) {
    return film.comments.filter((comment) => comment.id !== id);
  }

  filterFilmsByTime(period) {
    if (period !== `all-time`) {
      const todayDate = new Date();
      return this.getAllFilms().slice()
        .filter((film) => {
          return moment(film.watchingDate).isSameOrAfter(todayDate, period) && film.isWatched;
        });
    }

    return this.getAllFilms();
  }

  setSorting(sortType) {
    this._activeSortType = sortType;
  }
}
