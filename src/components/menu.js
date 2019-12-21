import {createFilterTemplate} from './filter-template';
import {createElement} from '../utilities/utilities';

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
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Menu {
  constructor(films, filters) {
    this._element = null;
    this._films = films;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._films, this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
