import {pluralRulesOptions} from '../mocks/utilities';

export const createFilmCardTemplate = (filmData) => {
  const {
    filmName,
    rating,
    releaseYear,
    movieDuration,
    genres,
    posterUrl,
    description,
    comments,
    isFavorite,
    isWatched,
    isInWatchList
  } = filmData;

  const commentLabel = pluralRulesOptions(comments, `comment`, `comments`);

  const isMarkActive = (mark) => {
    return mark ? `film-card__controls-item--active` : ``;
  };

  const firstGenre = genres[0];

  return `
    <article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${movieDuration}</span>
        <span class="film-card__genre">${firstGenre}</span>
      </p>
      <img src="./images/posters/${posterUrl}" alt="" class="film-card__poster">
      <p class="film-card__description">
        ${description}
      </p>
      <a class="film-card__comments">${comments} ${commentLabel}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isMarkActive(isInWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkActive(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isMarkActive(isFavorite)}">Mark as favorite</button>
      </form>
    </article>
  `;
};
