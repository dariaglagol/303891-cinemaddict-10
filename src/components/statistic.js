import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractSmartComponent from "./abstract-smart-component";
import {getWatchedFilms, getFilmTotalDuration, getUserStatus} from '../utilities/utilities';
import {CHART_BACKGROUND_COLORS} from '../mocks/constants';

const createStatisticTemplate = (userData) => {
  const {
    userStatus,
    watchedFilms,
    totalDuration,
    mostWatchedGenre
  } = userData;

  const preparedTotalDuration = getFilmTotalDuration(totalDuration).split(` `);
  const hours = totalDuration ? preparedTotalDuration[0] : `0`;
  const minutes = totalDuration ? preparedTotalDuration[1] : `0`;

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userStatus}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time">
        <label for="statistic-all-time" class="statistic__filters-label" data-period="all-time">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label" data-period="today">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label" data-period="week">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label" data-period="month">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label" data-period="year">Year</label>
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
          <p class="statistic__item-text">${mostWatchedGenre}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" id="chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

const getTotalFilmsDuration = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched === true);
  return watchedFilms.reduce((accumulator, film) => accumulator + film.movieDuration, 0);
};

const getWatchedStatisticGenres = (films) => {
  const initialWatchedRating = {};

  films.forEach((film) => {
    film.genres.forEach((genre = ``) => {
      if (initialWatchedRating[genre]) {
        initialWatchedRating[genre] = initialWatchedRating[genre] + 1;
        return;
      }
      initialWatchedRating[genre] = 1;
    });
  });

  return initialWatchedRating;
};

const getMostWatchedGenre = (films) => {
  const genres = getWatchedStatisticGenres(films);
  const genresKeys = Object.keys(genres);
  let maxWatchedGenreCount = 0;
  let genre = `-`;

  genresKeys.forEach((genreName) => {
    if (maxWatchedGenreCount < genres[genreName]) {
      maxWatchedGenreCount = genres[genreName];
      genre = genreName;
    }
  });

  return genre;
};

const renderChart = (ctx, chartData, period) => {
  const genreLabels = Object.keys(chartData);
  const values = genreLabels.map((label) => chartData[label]);
  const periodLabel = period !== `all-time` ? period : `all time`;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: genreLabels,
      datasets: [{
        data: values,
        label: `Watched by ${periodLabel}`,
        backgroundColor: CHART_BACKGROUND_COLORS
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} films — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#888`,
        bodyFontColor: `#ffffff`,
        borderColor: `#000000`,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 5
      },
      title: {
        display: true,
        text: `Watched by all time`,
        fontSize: 16,
        fontColor: `#ffffff`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#ffffff`,
          fontSize: 13,
        }
      }
    }
  });
};

export default class Statistic extends AbstractSmartComponent {
  constructor(filmModel) {
    super();

    this._filmModel = filmModel;
    this._period = `all-time`;
    this._films = filmModel.filterFilmsByTime(this._period);

    this.renderTopSectionStatistic();

    this._renderChart(this._films);
    this.setActivePeriod(this._period);
    this.setPeriodChangeHandler();
  }

  getTemplate() {
    return createStatisticTemplate(this._userData);
  }

  renderTopSectionStatistic() {
    const films = this._filmModel.filterFilmsByTime(this._period);

    this._userData = {
      userStatus: getUserStatus(this._filmModel.getAllFilms()),
      watchedFilms: getWatchedFilms(films),
      totalDuration: getTotalFilmsDuration(films),
      mostWatchedGenre: getMostWatchedGenre(films)
    };
  }

  _renderChart(films) {
    if (!films.length) {
      return;
    }
    const statisticChart = this.getElement().querySelector(`.statistic__chart`);

    const chartData = getWatchedStatisticGenres(films);

    renderChart(statisticChart, chartData, this._period);
  }

  rerender(films) {
    this.renderTopSectionStatistic();
    super.rerender();
    this._renderChart(films);
    this.setActivePeriod(this._period);
  }

  recoveryListeners() {
    this.setPeriodChangeHandler();
  }

  setActivePeriod(period) {
    const currentActivePeriod = this.getElement()
      .querySelector(`[data-period=${period}]`);
    const currentActivePeriodId = currentActivePeriod.getAttribute(`for`);
    this.getElement()
      .querySelector(`#${currentActivePeriodId}`)
      .setAttribute(`checked`, `checked`);
  }

  setPeriodChangeHandler() {
    this.getElement()
      .querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const target = evt.target;
        const period = target.dataset.period;

        if (period) {
          this._period = period;
          this._films = this._filmModel.filterFilmsByTime(period);
          this.rerender(this._films);
        }
      });
  }
}
