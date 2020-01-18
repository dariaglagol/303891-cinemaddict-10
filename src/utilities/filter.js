import {FiltersNames} from '../mocks/constants.js';

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
  console.log('getFilmsByFilter', filter === FiltersNames.WATCHLIST);
  switch (filter) {
    case FiltersNames.ALL:
      return getAllFilms(films);
    case FiltersNames.WATCHLIST:
      return getWatchListFilms(films);
    case FiltersNames.HISTORY:
      return getWatchedFilms(films);
    case FiltersNames.FAVORITES:
      return getFavoritesFilms(films);
  }

  return films;
};
