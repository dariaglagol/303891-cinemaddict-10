import {createFilmCardTemplate} from './film-card-template';
import {RATES_CARDS_COUNT} from '../mocks/constants';

const sortData = (a, b, type) => {
  if (a[type] < b[type]) {
    return 1;
  } else if (a[type] > b[type]) {
    return -1;
  }
  return 0;
};

const ratedFilmTemplate = (films, type) => {
  const filmsSorted = films
    .slice()
    .sort((a, b) => {
      return sortData(a, b, type);
    })
    .slice(0, RATES_CARDS_COUNT);

  const filmsTemplate = filmsSorted
    .map((film) => {
      return createFilmCardTemplate(film);
    })
    .join(``);

  return filmsTemplate;
};

const topRatedTemplate = (films, type) => {
  if (films.every((film) => film[type] === 0)) {
    return ``;
  }

  const header = type === `rating` ? `Top rated` : `Most commented`;

  return `
    <section class="films-list--extra">
      <h2 class="films-list__title">${header}</h2>

      <div class="films-list__container">
        ${ratedFilmTemplate(films, type)}
      </div>
    </section>
  `;
};

export {topRatedTemplate};
