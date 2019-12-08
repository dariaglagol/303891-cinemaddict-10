import {INITIAL_FILTERS_STATE} from './constants';

const generateFilters = (filmsData) => {
  return filmsData.reduce((prev, film) => ({
    'all movies': null,
    'watchlist': film.isInWatchList ? prev.watchlist + 1 : prev.watchlist,
    'history': film.isWatched ? prev.history + 1 : prev.history,
    'favorites': film.isFavorite ? prev.favorites + 1 : prev.favorites,
  }), INITIAL_FILTERS_STATE);
};

export {generateFilters};
