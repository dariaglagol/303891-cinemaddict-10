import {createFirstFilms} from './film-common-template';
import {createTopRatedTemplate} from './top-raited-films';
import {createElement} from "../utilities/utilities";

const createFilmListsTemplate = (films) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>


     </section>`
  );
};

// ${createTopRatedTemplate(films, `rating`)}
// ${createTopRatedTemplate(films, `comments`)}

export default class FilmListTemplate {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFilmListsTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
