import moment from "moment";
import AbstractComponent from "./abstract-component";
import RatingForm from "./rating-form";
import Comments from "./comments";
import CommentForm from "./comment-form";
import {RenderPosition} from "../mocks/constants";
import {render} from "../utilities/render";
import {getFilmDuration} from "../utilities/utilities";

const isCheckboxActive = (statement) => {
  return statement ? `checked` : ``;
};

const createFilmPopupTemplate = (film, options) => {
  const {
    filmName,
    rating,
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

  const preparedReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);

  const watchedLabel = isWatched ? `Already watched` : `Add to watched`;
  const watchListLabel = isInWatchList ? `Remove from watchlist` : `Add to watchlist`;
  const favoritesLabel = isFavorite ? `Remove from favorites` : `Add to favorites`;

  const preparedMovieDuration = getFilmDuration(movieDuration);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${posterUrl}" alt="poster '${filmName}'">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${filmName}</p>
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
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film, popupRenderPlace) {
    super();
    this._film = film;
    this.popupRenderPlace = popupRenderPlace;

    this._isFilmFavorite = this._film.isFavorite;
    this._isInWatchList = this._film.isInWatchList;
    this._isWatched = this._film.isWatched;

    // this._subscribeOnEvents();
    // this.renderFormElement();
  }

  static renderPopup(popupRenderPlace, filmPopup, ratingForm, commentsComponent, commentForm) {
    if (ratingForm) {
      render(filmPopup, ratingForm.getElement(), RenderPosition.BEFORE_END);
    }
    render(filmPopup, commentsComponent.getElement(), RenderPosition.BEFORE_END);
    render(commentsComponent.getElement(), commentForm.getElement(), RenderPosition.BEFORE_END);
    commentsComponent.getCommentsList(commentsComponent.getElement());
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, {
      isFavorite: this._isFilmFavorite,
      isInWatchList: this._isInWatchList,
      isWatched: this._isWatched
    });
  }

  renderFormElement() {
    if (this._isWatched) {
      const ratingForm = new RatingForm(this._film);
      const commentsComponent = new Comments(this._film.comments);
      const commentForm = new CommentForm();

      FilmPopup.renderPopup(this.popupRenderPlace, this._element, ratingForm, commentsComponent, commentForm);
    }
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
}
