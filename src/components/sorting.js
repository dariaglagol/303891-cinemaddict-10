import AbstractComponent from "./abstract-component";
import {SortType} from '../mocks/constants';

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
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

      const target = evt.target;
      const sortType = evt.target.dataset.sortType;
      const siblingsElements = Array.from(target.parentNode.parentNode.children);

      if (target.tagName !== `A`) {
        return;
      }

      if (this._currenSortType === sortType) {
        return;
      }

      siblingsElements.forEach((el) => {
        el.firstElementChild.classList.remove(`sort__button--active`);
      });

      this._currenSortType = sortType;

      target.classList.add(`sort__button--active`);

      handler(this._currenSortType);
    });
  }
}
