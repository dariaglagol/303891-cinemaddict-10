import {createFilmCardTemplate} from './film-card-template';
import {RATES_CARDS_COUNT} from '../mocks/constants';

const ratedFilmTemplate = (films, type) => {
  const filmsSorted = films
    .slice()
    .sort((a, b) => {
      if (type === `rating`) {
        return a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0;
      }
      return a.comments < b.comments ? 1 : a.comments > b.comments ? -1 : 0;
    })
    .slice(0, RATES_CARDS_COUNT);

  const filmsTemplate = filmsSorted.map((film) => {
    return createFilmCardTemplate(film);
  }).join(``);

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
