import {createFirstFilms} from './film-common-template';
import {createTopRatedTemplate} from './top-raited-films';

export const createFilmListsTemplate = (films, showMoreButton) => {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">${createFirstFilms(films)}</div>
        ${showMoreButton}
      </section>

      ${createTopRatedTemplate(films, `rating`)}
      ${createTopRatedTemplate(films, `comments`)}
     </section>
  `;
};
