import moment from "moment";
import AbstractComponent from "./abstract-component";
import RatingForm from "./rating-form";
import {getFilmDuration} from "../utilities/utilities";

const isCheckboxActive = (statement) => {
  return statement ? `checked` : ``;
};

const createFilmPopupTemplate = (film, options, nodes) => {
  const {
    filmName,
    rating,
    alternativeFilmName,
    releaseDate,
    movieDuration,
    genres,
    description,
    ageRating,
    director,
    writers,
    actors,
    country,
    posterUrl,
  } = film;

  const {
    isFavorite,
    isWatched,
    isInWatchList
  } = options;

  const {
    ratingForm,
  } = nodes;

  const preparedReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);

  const watchedLabel = isWatched ? `Already watched` : `Add to watched`;
  const watchListLabel = isInWatchList ? `Remove from watchlist` : `Add to watchlist`;
  const favoritesLabel = isFavorite ? `Remove from favorites` : `Add to favorites`;

  const preparedMovieDuration = getFilmDuration(movieDuration);

  const renderFormTemplate = isWatched ? ratingForm : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${posterUrl}" alt="poster '${filmName}'">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${alternativeFilmName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${preparedReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${preparedMovieDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genres.join(` `)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isCheckboxActive(isInWatchList)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${watchListLabel}</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isCheckboxActive(isWatched)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">${watchedLabel}</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isCheckboxActive(isFavorite)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${favoritesLabel}</label>
          </section>
        </div>
        ${renderFormTemplate}

      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;

    this._ratingForm = new RatingForm(this._film);

    this._isFilmFavorite = this._film.isFavorite;
    this._isInWatchList = this._film.isInWatchList;
    this._isWatched = this._film.isWatched;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, {
      isFavorite: this._isFilmFavorite,
      isInWatchList: this._isInWatchList,
      isWatched: this._isWatched
    }, {
      ratingForm: this._ratingForm.getTemplate(),
    });
  }

  setPopupCloseHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comments-list`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentElement = evt.target.closest(`.film-details__comment`);
        const deletedCommentId = parseInt(commentElement.dataset.commentId, 10);
        handler(deletedCommentId);
      });
  }

  getFormData() {
    const commentForm = this.getElement().querySelector(`.film-details__new-comment`);
    if (commentForm) {
      const commentTextAreaValue = commentForm
        .querySelector(`.film-details__comment-input`)
        .value;
      const commentEmoji = commentForm
        .querySelector(`.film-details__add-emoji-label img`)
        .getAttribute(`alt`);

      return {commentTextAreaValue, commentEmoji};
    }

    return null;
  }
}
