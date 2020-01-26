import Menu from '../components/menu';
import {FiltersName} from '../mocks/constants';
import {render, replaceElement} from '../utilities/render';
import {generateFilters} from "../mocks/filters";
import {RenderPosition} from '../mocks/constants';

export default class FilterController {
  constructor(container) {
  // constructor(container, filmsModel) {
    this._container = container;
    this._activeFilterType = FiltersName.ALL;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render(filmsModel) {
    const oldMenuComponent = this._menuComponent;

    this._filmsModel = filmsModel;
    const filters = generateFilters(this._filmsModel.getAllFilms());
    this._menuComponent = new Menu(this._activeFilterType, filters);

    if (oldMenuComponent) {
      replaceElement(this._menuComponent.getElement(), oldMenuComponent.getElement());
    } else {
      render(this._container, this._menuComponent.getElement(), RenderPosition.AFTER_BEGIN);
      this._menuComponent.setFilterChangeHandler(this._onFilterChange);
    }

    // render(this._container, this._menuComponent.getElement(), RenderPosition.AFTER_BEGIN);
    // this._menuComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = FiltersName[filterType];
  }
}
