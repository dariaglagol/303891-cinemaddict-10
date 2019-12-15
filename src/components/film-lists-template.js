import {createFirstFilms} from './film-common-template';
import {createTopRatedTemplate} from './top-raited-films';
import {createElement} from "../utilities/utilities";

const createFilmListsTemplate = (films, showMoreButton) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">${createFirstFilms(films)}</div>
        ${showMoreButton}
      </section>

      ${createTopRatedTemplate(films, `rating`)}
      ${createTopRatedTemplate(films, `comments`)}
     </section>`
  );
};

export default class FilmListTemplate {
  constructor(films, showMoreButton) {
    this._element = null;
    this._films = films;
    this._showMoreButton = showMoreButton;
  }

  getTemplate() {
    return createFilmListsTemplate(this._films, this._showMoreButton)
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
