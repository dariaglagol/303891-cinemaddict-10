import {createFilterTemplate} from './filter-template';

const createFiltersTemplate = (filters, activeFilter) => {
  const filtersKey = Object.keys(filters);

  return filtersKey.map((filterName) => {
    const filterItem = [filterName, filters[filterName]];
    return createFilterTemplate(filterItem, activeFilter);
  }).join(``);
};

export const createMenuTemplate = (films, filters, activeFilter) => {
  return `
    <nav class="main-navigation">
      ${createFiltersTemplate(filters, activeFilter)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
  `;
};
