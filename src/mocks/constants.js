const Rating = {
  MIN: 0,
  MAX: 9
};

const TopFilmType = {
  RATING: `rating`,
  COMMENTS: `comments`
};

const MAX_VALUE = 3;

const FiltersName = {
  ALL: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const INITIAL_FILTERS_STATE = {
  'all movies': null,
  'watchlist': 0,
  'history': 0,
  'favorites': 0
};

const CARDS_COUNT = 5;
const RATES_CARDS_COUNT = 2;

const USER_STATUSES = new Map([
  [`21`, `Movie Buff`],
  [`11`, `Fan`],
  [`1`, `Novice`],
  [`0`, ``]
]);

const COMMENTS_EMODJIES = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`
];

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

const MAX_FILM_SCORE = 9;

const CLICKABLE_ITEMS = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

const SortTypeName = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`,
};

const SortTypeCallbacks = {
  [SortTypeName.DATE]: (a, b) => b.releaseDate - a.releaseDate,
  [SortTypeName.RATING]: (a, b) => b.rating - a.rating,
  [SortTypeName.DEFAULT]: () => {}
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const AUTHORIZATION = `Basic dXP}lckBwYNECzd21yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const CHART_BACKGROUND_COLORS = [
  `rgb(255, 99, 132)`,
  `rgb(255, 60, 24)`,
  `rgb(54, 162, 235)`,
  `rgb(23, 81, 235)`,
  `rgb(255, 206, 86)`,
  `rgb(75, 192, 192)`,
  `rgb(153, 102, 255)`,
  `rgb(51, 255, 230)`,
  `rgb(255, 159, 64)`,
  `rgb(28, 107, 114)`,
  `rgb(190, 245, 116)`,
];

const HIDDEN_CLASS = `visually-hidden`;

const PeriodForMoment = {
  TODAY: `days`,
  WEEK: `weeks`,
  MONTH: `months`,
  YEAR: `years`,
};

const UserDetail = {
  IS_IN_WATCHLIST: `isInWatchList`,
  IS_FAVORITE: `isFavorite`,
  IS_WATCHED: `isWatched`,
  PERSONAL_RATING: `personalRating`
};

export {RenderPosition, UserDetail, COMMENTS_EMODJIES, CHART_BACKGROUND_COLORS, HIDDEN_CLASS, PeriodForMoment, AUTHORIZATION, END_POINT, Method, FiltersName, Mode, SortTypeName, SortTypeCallbacks, TopFilmType, CLICKABLE_ITEMS, MAX_FILM_SCORE, MAX_VALUE, Rating, CARDS_COUNT, USER_STATUSES, INITIAL_FILTERS_STATE, RATES_CARDS_COUNT};
