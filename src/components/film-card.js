import moment from "moment";
import AbstractComponent from "./abstract-component";
import {getPlural, getFilmDuration} from '../utilities/utilities';

const createFilmCardTemplate = (filmData) => {
  const {
    filmName,
    rating,
    releaseDate,
    movieDuration,
    genres,
    posterUrl,
    description,
    comments,
    isFavorite,
    isWatched,
    isInWatchList
  } = filmData;

  const commentLabel = getPlural(comments.length, `comment`, `comments`);

  const isMarkActive = (mark) => {
    return mark ? `film-card__controls-item--active` : ``;
  };

  const firstGenre = genres[0];

  const preparedReleaseDate = moment(releaseDate).format(`YYYY`);
  const preparedMovieDuration = getFilmDuration(movieDuration);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${preparedReleaseDate}</span>
        <span class="film-card__duration">${preparedMovieDuration}</span>
        <span class="film-card__genre">${firstGenre}</span>
      </p>
      <img src="./images/posters/${posterUrl}" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${description}
      </p>
      <a class="film-card__comments">${comments.length} ${commentLabel}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isMarkActive(isInWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkActive(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isMarkActive(isFavorite)}">Mark as favorite</button>
      </form>
    </article>
  `);
};

export default class FilmCard extends AbstractComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmData);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
