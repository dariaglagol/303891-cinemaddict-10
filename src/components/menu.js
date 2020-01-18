import AbstractComponent from "./abstract-component";
import {createFilterTemplate} from './filter-template';

const createFiltersTemplate = (filters) => {
  const filtersKey = Object.keys(filters);

  return filtersKey.map((filterName) => {
    const filterItem = [filterName, filters[filterName]];
    return createFilterTemplate(filterItem);
  }).join(``);
};

const createMenuTemplate = (films, filters) => {
  return (
    `<nav class="main-navigation">
        ${createFiltersTemplate(filters)}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(films, filters) {
    super();
    this._films = films.getFilms();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._films, this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.getAttribute(`data-filter-type`);
      if (filterName) {
        handler(filterName);
      }
    });
  }
}
