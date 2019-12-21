import FilmCard from './film-card-template';
import {CARDS_COUNT, RenderPosition} from '../mocks/constants';
import {render, toggleEventListeners, renderPopup} from "../utilities/utilities";
import FilmPopup from "./film-popup-template";
import RatingForm from "./rating-form";
import CommentsComponent from "./comments-component-template";
import CommentForm from "./comment-form";

const renderFilm = (film, filmsRenderPlace, popupRenderPlace) => {
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

  render(filmsRenderPlace, card.getElement(), RenderPosition.AFTER_BEGIN);
};

const renderFilms = (films, renderPlace, popupRenderPlace, slicePoint) => {
  return films.slice(slicePoint, slicePoint + CARDS_COUNT).map((film) => {
    return renderFilm(film, renderPlace, popupRenderPlace);
  }).join(`\n`);
};

export {renderFilms};
