export const createFilterTemplate = (filterItem, activeFilter) => {
  const [name, count] = filterItem;

  const preparedNameString = name[0].toUpperCase() + name.slice(1);

  return `
    <a href="#${name}" class="main-navigation__item ${activeFilter === name && `main-navigation__item--active`}">${preparedNameString}
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>
  `;
};
