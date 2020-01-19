import Menu from '../components/menu';
import {FiltersNames} from '../mocks/constants';
import {render} from '../utilities/render';
import {generateFilters} from "../mocks/filters";
import {RenderPosition} from '../mocks/constants';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FiltersNames.ALL;
    const filters = generateFilters(this._filmsModel.getAllFilms());

    this._menuComponent = new Menu(this._activeFilterType, filters);

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    render(this._container, this._menuComponent.getElement(), RenderPosition.AFTER_BEGIN);
    this._menuComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = FiltersNames[filterType];
  }
}
