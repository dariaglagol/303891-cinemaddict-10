import AbstractComponent from "./abstract-component";

const createFilterTemplate = (filterItem) => {
  const [name, count, activeFilter] = filterItem;

  const preparedNameString = name[0].toUpperCase() + name.slice(1);

  return `
    <a
      href="#${name}"
      class="main-navigation__item ${activeFilter === name && `main-navigation__item--active`}"
      data-filter-type=${name}
    >${preparedNameString}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>
  `;
};

const createFiltersTemplate = (filters, activeFilter) => {
  const filtersKey = Object.keys(filters);

  return filtersKey.map((filterName) => {
    const filterItem = [filterName, filters[filterName], activeFilter];
    return createFilterTemplate(filterItem);
  }).join(``);
};

const createMenuTemplate = (activeFilter, filters) => {
  return (
    `<nav class="main-navigation">
        ${createFiltersTemplate(filters, activeFilter)}
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(activeFilter, filters) {
    super();
    this._activeFilter = activeFilter;
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._activeFilter, this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;
      this._toggleActiveClass(target);
      const filterName = target.getAttribute(`data-filter-type`);
      if (filterName) {
        handler(filterName);
      }
    });
  }

  _toggleActiveClass(target) {
    this.getElement()
      .querySelector(`.main-navigation__item--active`)
      .classList.remove(`main-navigation__item--active`);

    target.classList.add(`main-navigation__item--active`);
  }

  setStatsShowHandler(handler) {
    this.getElement()
      .querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, handler);
  }
}
