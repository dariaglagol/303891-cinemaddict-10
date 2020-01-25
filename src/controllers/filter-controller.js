import Menu from '../components/menu';
import Statistic from '../components/statistic';
import PageController from './page-controller'
import {FiltersName} from '../mocks/constants';
import {render} from '../utilities/render';
import {generateFilters} from "../mocks/filters";
import {RenderPosition} from '../mocks/constants';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FiltersName.ALL;
    const filters = generateFilters(this._filmsModel.getAllFilms());

    this._statistic = new Statistic();
    this._pageController = new PageController(this._container, this._filmsModel);

    this._menuComponent = new Menu(this._activeFilterType, filters);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onStatsClick = this._onStatsClick.bind(this);

    this._isStatsShow = false;
  }

  render() {
    render(this._container, this._menuComponent.getElement(), RenderPosition.AFTER_BEGIN);
    this._menuComponent.setFilterChangeHandler(this._onFilterChange);
    this._menuComponent.setStatsShowHandler(this._onStatsClick);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = FiltersName[filterType];
  }

  _onStatsClick() {
    this.setStatisticState();
  }

  setStatisticState() {
    if (this._isStatsShow) {
      this._isStatsShow = false;
      this._statistic.hide();
      this._pageController.hideMainPage();
      return;
    }
    this._isStatsShow = true;
    this._statistic.hide();
    this._pageController.showMainPage();
  }
}
