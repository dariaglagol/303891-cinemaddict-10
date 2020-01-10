import AbstractComponent from "./abstract-component";
import {SortTypeName} from '../mocks/constants';

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortTypeName.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortTypeName.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortTypeName.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractComponent {
  getTemplate() {
    return createSortingTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const currentActiveSort = this.getElement().querySelector(`.sort__button--active`);

      const target = evt.target;
      const sortType = evt.target.dataset.sortType;

      if (target.tagName !== `A`) {
        return;
      }

      if (this._currenSortType === sortType) {
        return;
      }

      currentActiveSort.classList.remove(`sort__button--active`);

      this._currenSortType = sortType;

      target.classList.add(`sort__button--active`);

      handler(this._currenSortType);
    });
  }
}
