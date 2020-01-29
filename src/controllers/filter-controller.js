import Menu from '../components/menu';
import {FiltersName} from '../mocks/constants';
import {render, replaceElement} from '../utilities/render';
import {generateFilters} from "../mocks/filters";
import {RenderPosition} from '../mocks/constants';

export default class FilterController {
  constructor(container, statistic) {
    this._container = container;
    this._activeFilterType = FiltersName.ALL;
    this._statistic = statistic;

    this._onFilterChange = this._onFilterChange.bind(this);
    // this._onStatsClick = this._onStatsClick.bind(this);

    this._isStatsHide = false;
  }

  render(filmsModel) {
    // render(this._container, this._menuComponent.getElement(), RenderPosition.AFTER_BEGIN);
    // this._menuComponent.setFilterChangeHandler(this._onFilterChange);
    // this._menuComponent.setStatsShowHandler(this._onStatsClick);

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
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = FiltersName[filterType];
  }

  // _onStatsClick() {
  //   this.setStatisticState();
  // }

  // setStatisticState() {
  //   if (!this._isStatsHide) {
  //     this._isStatsHide = true;
  //     this._statistic.hide();
  //     this._pageController.showMainPage();
  //     return;
  //   }
  //   this._isStatsHide = false;
  //   this._statistic.show();
  //   this._pageController.hideMainPage();
  // }
}
