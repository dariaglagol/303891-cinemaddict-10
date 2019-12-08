import {filterTemplate} from './filter-template';

const createFiltersTemplate = (filmsData, filters) => {
  const filtersKey = Object.keys(filters);

  return filtersKey.map((filterName) => {
    const filterItem = [filterName, filters[filterName]];
    return filterTemplate(filterItem);
  }).join(``);
};

export const createMenuTemplate = (films, filters) => {
  return `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${createFiltersTemplate(films, filters)}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
  `;
};
