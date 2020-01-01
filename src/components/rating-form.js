import {getRandomIntegerNumber} from "../utilities/utilities";
import {MAX_FILM_SCORE} from '../mocks/constants';
import AbstractComponent from "./abstract-component";

const createRatingInputs = () => {
  const ratingMarkTemplate = [];

  const RANDOM_SCORE = getRandomIntegerNumber(1, MAX_FILM_SCORE);

  for (let i = 1; i <= MAX_FILM_SCORE; i++) {
    const template = `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${RANDOM_SCORE === i ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
    `;

    ratingMarkTemplate.push(template);
  }

  return ratingMarkTemplate;
};

const createRatingForm = (filmName, posterUrl) => {
  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/${posterUrl}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${filmName}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${createRatingInputs().join(``)}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

export default class RatingForm extends AbstractComponent{
  constructor(film) {
    super();
    this._filmName = film.filmName;
    this._posterUrl = film.posterUrl;
  }

  getTemplate() {
    return createRatingForm(this._filmName, this._posterUrl);
  }
}
