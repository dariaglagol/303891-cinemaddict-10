import {FiltersNames} from "../mocks/constants";
import {getFilmsByFilter} from "../utilities/filter";

export default class MoviesModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FiltersNames.ALL;
    this._filterChangeHandlers = [];
  }

  getFilms() {
    console.log(this._activeFilterType, getFilmsByFilter(this._films, this._activeFilterType));
    return getFilmsByFilter(this._films, this._activeFilterType);
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
}
