import AbstractComponent from "./abstract-component";
import {MAX_FILM_SCORE} from '../mocks/constants';

const createRatingInputs = (personalRating) => {
  return new Array(MAX_FILM_SCORE)
    .fill(``)
    .map((item, index) => {
      const value = index + 1;
      const template = `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${value}" id="rating-${value}" ${personalRating === value ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>
      `;

      return template;
    });
};

const createRatingForm = (filmName, posterUrl, personalRating) => {
  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./${posterUrl}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${filmName}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${createRatingInputs(personalRating).join(``)}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

export default class RatingForm extends AbstractComponent {
  constructor(film) {
    super();
    this._filmName = film.filmName;
    this._posterUrl = film.posterUrl;
    this._personalRating = film.personalRating;
  }

  getTemplate() {
    return createRatingForm(this._filmName, this._posterUrl, this._personalRating);
  }
}
