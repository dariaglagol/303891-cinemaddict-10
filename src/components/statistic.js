// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractComponent from "./abstract-component";
import {getWatchedFilms, getFilmTotalDuration} from '../utilities/utilities';
import {generateFilters} from "../mocks/filters";
import {INITIAL_FILTERS_STATE} from "../mocks/constants";

const createStatisticTemplate = (userData) => {
  const {
    userStatus,
    watchedFilms,
    totalDuration
  } = userData;

  const preparedTotalDuration = getFilmTotalDuration(totalDuration).split(` `);
  const hours = preparedTotalDuration[0];
  const minutes = preparedTotalDuration[1];

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userStatus}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilms} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

const getTotalFilmsDuration = (films) => {
  const watchedFilms = films.slice().filter((film) => film.isWatched === true);
  const initialValue = 0;
  const totalDuration = watchedFilms.reduce((accumulator, film) => accumulator + film.movieDuration, initialValue);
  return totalDuration;
};

const getMostWatchedGenre = () => {
  return filmsData.reduce((prev, film) => {
    return {
      'all movies': null,
      'watchlist': film.isInWatchList ? prev.watchlist + 1 : prev.watchlist,
      'history': film.isWatched ? prev.history + 1 : prev.history,
      'favorites': film.isFavorite ? prev.favorites + 1 : prev.favorites,
    };
  }, INITIAL_FILTERS_STATE);
};

export default class Statistic extends AbstractComponent {
  constructor() {
    super();

    this._userData = {};
  }
  getTemplate() {
    return createStatisticTemplate(this._userData);
  }

  getUserStatistic(data) {
    this._userData = data;
    this._filmModel = data.filmModel;
    this._userData.watchedFilms = getWatchedFilms(this._filmModel.getAllFilms());
    this._userData.totalDuration = getTotalFilmsDuration(this._filmModel.getAllFilms());
    this._userData.mostWatchedGenre = getMostWatchedGenre(this._filmModel.getAllFilms());
  }
}
