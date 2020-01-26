import AbstractComponent from "./abstract-component";
// import {createFilterTemplate} from './filter-template';

const createFilterTemplate = (filterItem) => {
  const [name, count, isFilterActive] = filterItem;

  const preparedNameString = name[0].toUpperCase() + name.slice(1);

  return `
    <a
      href="#${name}"
      class="main-navigation__item ${isFilterActive === name && `main-navigation__item--active`}"
      data-filter-type=${name}
    >${preparedNameString}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>
  `;
};

const createFiltersTemplate = (filters, isFilterActive) => {
  const filtersKey = Object.keys(filters);

  return filtersKey.map((filterName) => {
    const filterItem = [filterName, filters[filterName], isFilterActive];
    return createFilterTemplate(filterItem);
  }).join(``);
};

const createMenuTemplate = (isFilterActive, filters) => {
  return (
    `<nav class="main-navigation">
        ${createFiltersTemplate(filters, isFilterActive)}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(isFilterActive, filters) {
    super();
    this._isFilterActive = isFilterActive;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._isFilterActive, this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const target = evt.target;
      this._removeActiveClass();
      target.classList.add(`main-navigation__item--active`);
      const filterName = target.getAttribute(`data-filter-type`);
      if (filterName) {
        handler(filterName);
      }
    });
  }

  _removeActiveClass() {
    this.getElement()
      .querySelector(`.main-navigation__item--active`)
      .classList.remove(`main-navigation__item--active`);
  }
}
