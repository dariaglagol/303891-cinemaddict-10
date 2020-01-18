export const createFilterTemplate = (filterItem) => {
  const [name, count] = filterItem;

  const preparedNameString = name[0].toUpperCase() + name.slice(1);

  const activeFilter = `all movies`;

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
