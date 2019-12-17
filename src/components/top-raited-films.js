import FilmCard from './film-card-template';
import {RATES_CARDS_COUNT, RenderPosition} from '../mocks/constants';
import {createElement, newRender} from "../utilities/utilities";

const sortData = (a, b, type) => {
  if (a[type] < b[type]) {
    return 1;
  } else if (a[type] > b[type]) {
    return -1;
  }
  return 0;
};

const renderFilm = (film, renderPlace) => {
  const card = new FilmCard(film);

  newRender(renderPlace, card.getElement(), RenderPosition.BEFORE_END);
};

const createFirstFilms = (films, renderPlace) => {
  return films.map((film) => {
    return renderFilm(film, renderPlace);
  }).join(`\n`);
};

const createRatedFilmTemplate = (films, type, renderPlace) => {
  const filmsSorted = films
    .slice()
    .sort((a, b) => {
      return sortData(a, b, type);
    })
    .slice(0, RATES_CARDS_COUNT);

  return createFirstFilms(filmsSorted, renderPlace);
};

const createTopRatedTemplate = (films, type) => {
  if (films.every((film) => film[type] === 0)) {
    return ``;
  }

  const header = type === `rating` ? `Top rated` : `Most commented`;
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${header}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRatedFilm {
  constructor(films, type) {
    this._element = null;
    this._films = films;
    this._type = type;
  }

  getTemplate() {
    return createTopRatedTemplate(this._films, this._type);
  }

  getWrapperElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getCardsElement(place) {
    const cardRenderPlace = place.querySelector(`.films-list__container`);
    return createRatedFilmTemplate(this._films, this._type, cardRenderPlace);
  }
}
