import {RenderPosition} from '../mocks/constants';

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getPlural = (count, one, more) => {
  return count > 1 || count === 0 ? more : one;
};

const generateRandomArrayPiece = (maxValue, array) => {
  const pieceLength = getRandomIntegerNumber(1, maxValue);
  const startPiece = getRandomIntegerNumber(1, array.length - pieceLength);
  return array.slice(startPiece, startPiece + pieceLength);
};

const createElement = (template) => {
  if (template === ``) {
    return ``;
  }

  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const render = (container, template, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFORE_END:
      container.append(template);
      break;
  }
};

const toggleEventListeners = (isPopupClickListen, clickableItems, card, handle) => {
  clickableItems.forEach((item) => {
    const clickableItem = card.getElement().querySelector(item);
    if (isPopupClickListen) {
      clickableItem.removeEventListener(`click`, handle);
      return;
    }
    clickableItem.addEventListener(`click`, handle);
  });
};

const renderPopup = (popupRenderPlace, filmPopup, ratingForm, commentsComponent, commentForm) => {
  render(popupRenderPlace, filmPopup.getElement(), RenderPosition.BEFORE_END);
  render(filmPopup.getElement(), ratingForm.getElement(), RenderPosition.BEFORE_END);
  render(filmPopup.getElement(), commentsComponent.getElement(), RenderPosition.BEFORE_END);
  render(commentsComponent.getElement(), commentForm.getElement(), RenderPosition.BEFORE_END);
  commentsComponent.getCommentsList(commentsComponent.getElement());
};

export {render, createElement, toggleEventListeners, renderPopup, generateRandomArrayPiece, getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean, getPlural};
