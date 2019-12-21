import FilmCard from './film-card-template';
import {RATES_CARDS_COUNT, RenderPosition} from '../mocks/constants';
import {createElement, render, renderPopup, toggleEventListeners} from "../utilities/utilities";
import FilmPopup from "./film-popup-template";
import RatingForm from "./rating-form";
import CommentsComponent from "./comments-component-template";
import CommentForm from "./comment-form";

const sortData = (a, b, type) => {
  if (a[type] < b[type]) {
    return 1;
  } else if (a[type] > b[type]) {
    return -1;
  }
  return 0;
};

const renderFilm = (film, renderPlace, popupRenderPlace) => {
  const card = new FilmCard(film);
  const filmPopup = new FilmPopup(film);
  const ratingForm = new RatingForm(film);
  const commentsComponent = new CommentsComponent(film.comments);
  const commentForm = new CommentForm();

  const clickableItems = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

  let isPopupClickListen = false;

  const handleClosePopup = () => {
    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);

    closePopupButton.removeEventListener(`click`, handleClosePopup);

    filmPopup.getElement().remove();
    filmPopup.removeElement();
    ratingForm.removeElement();
    commentsComponent.removeElement();
    commentForm.removeElement();

    isPopupClickListen = false;

    toggleEventListeners(isPopupClickListen, clickableItems, card, handleOpenPopup);
  };

  const handleOpenPopup = () => {
    renderPopup(popupRenderPlace, filmPopup, ratingForm, commentsComponent, commentForm);

    isPopupClickListen = true;

    toggleEventListeners(isPopupClickListen, clickableItems, card, handleOpenPopup);

    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);

    closePopupButton.addEventListener(`click`, handleClosePopup);
  };

  toggleEventListeners(isPopupClickListen, clickableItems, card, handleOpenPopup);

  render(renderPlace, card.getElement(), RenderPosition.BEFORE_END);
};

const createFilms = (films, cardsRenderPlace, popupRenderPlace) => {
  films.forEach((film) => {
    renderFilm(film, cardsRenderPlace, popupRenderPlace);
  });
};

const createRatedFilmTemplate = (films, type, cardsRenderPlace, popupRenderPlace) => {
  const filmsSorted = films
    .slice()
    .sort((a, b) => {
      return sortData(a, b, type);
    })
    .slice(0, RATES_CARDS_COUNT);

  return createFilms(filmsSorted, cardsRenderPlace, popupRenderPlace);
};

const createTopRatedTemplate = (films, type) => {
  if (films.every((film) => film[type] === 0)) {
    return ``;
  }

  const header = type === `rating` ? `Top rated` : `Most commented`;
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${header}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRatedFilm {
  constructor(films, type) {
    this._element = null;
    this._films = films;
    this._type = type;
  }

  getTemplate() {
    return createTopRatedTemplate(this._films, this._type);
  }

  getWrapperElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getCardsElement(cardsRenderPlace, popupRenderPlace) {
    const cardRenderPlace = cardsRenderPlace.querySelector(`.films-list__container`);
    return createRatedFilmTemplate(this._films, this._type, cardRenderPlace, popupRenderPlace);
  }
}
