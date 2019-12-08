export const filterTemplate = (filterItem) => {
  const [name, count] = filterItem;

  const preparedNameString = name[0].toUpperCase() + name.slice(1);

  return `
    <a href="#${name}" class="main-navigation__item">${preparedNameString} <span class="main-navigation__item-count">${count}</span></a>
  `;
};
