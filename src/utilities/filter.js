import {FiltersName} from '../mocks/constants.js';

const getWatchListFilms = (films) => {
  return films.filter((film) => film.isInWatchList);
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getAllFilms = (films) => {
  return films;
};

const getFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, filter) => {
  switch (filter) {
    case FiltersName.ALL:
      return getAllFilms(films);
    case FiltersName.WATCHLIST:
      return getWatchListFilms(films);
    case FiltersName.HISTORY:
      return getWatchedFilms(films);
    case FiltersName.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};
