import AbstractComponent from "./abstract-component";
import {RATES_CARDS_COUNT} from '../mocks/constants';

const sortData = (a, b, type) => {
  if (a[type] < b[type]) {
    return 1;
  } else if (a[type] > b[type]) {
    return -1;
  }
  return 0;
};

const createTopFilms = (films, type) => {
  return films
    .slice()
    .sort((a, b) => {
      return sortData(a, b, type);
    })
    .slice(0, RATES_CARDS_COUNT);
};

const createTopTemplate = (films, type) => {
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

export default class TopFilm extends AbstractComponent {
  constructor(films, type) {
    super();
    this._films = films;
    this._type = type;
  }

  getTemplate() {
    return createTopTemplate(this._films, this._type);
  }

  getTopFilms() {
    return createTopFilms(this._films, this._type);
  }
}
