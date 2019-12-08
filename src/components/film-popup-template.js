import {createCommentsComponentTemplate} from './comments-component-template';

const isCheckboxActive = (statement) => {
  return statement ? `checked` : ``;
};

export const createFilmPopupTemplate = (film) => {
  const {
    filmName,
    rating,
    releaseYear,
    movieDuration,
    genres,
    description,
    comments,
    ageRating,
    director,
    writers,
    actors,
    country,
    isFavorite,
    isWatched,
    isInWatchList
  } = film;

  const watchedLabel = isWatched ? `Already watched` : `Add to watched`;
  const watchListLabel = isInWatchList ? `Remove from watchlist` : `Add to watchlist`;
  const favoritesLabel = isFavorite ? `Remove from favorites` : `Add to favorites`;

  return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

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
                  <td class="film-details__cell">${releaseYear}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${movieDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres}
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

        <div class="form-details__bottom-container">
           ${createCommentsComponentTemplate(comments)}
        </div>
      </form>
    </section>
  `;
};
