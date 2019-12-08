import {createFilmCardTemplate} from './film-card-template';
import {CARDS_COUNT} from '../mocks/constants';

const createCommonFilmTemplate = (films) => {
  const filmsTemplate = films.map((film) => {
    return createFilmCardTemplate(film);
  }).join(``);

  return filmsTemplate;
};

const createFirstFilms = (films) => {
  const filmsData = films.slice(0, CARDS_COUNT);
  return createCommonFilmTemplate(filmsData);
};

const createAdditionalFilms = (films, startSlice) => {
  const filmsData = films.slice(startSlice, startSlice + CARDS_COUNT);

  return createCommonFilmTemplate(filmsData);
};

export {createCommonFilmTemplate, createFirstFilms, createAdditionalFilms};
