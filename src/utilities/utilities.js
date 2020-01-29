import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {COMMENTS_TIME_RANGE, HIDDEN_CLASS, USER_STATUSES} from "../mocks/constants";
import {generateFilters} from "../mocks/filters";

momentDurationFormatSetup(moment);

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
  const startPiece = getRandomIntegerNumber(0, array.length - 1);
  return array.slice(startPiece, startPiece + pieceLength);
};

const setCardClickEventListeners = (clickableItems, card, handle) => {
  clickableItems.forEach((item) => {
    const clickableItem = card.getElement().querySelector(item);
    clickableItem.addEventListener(`click`, handle);
  });
};

const getFilmDuration = (movieDuration) => {
  const duration = moment.duration(movieDuration, `minutes`).format(`h[h] m[m]`);

  return duration;
};

const getFilmTotalDuration = (movieDuration) => {
  const duration = moment.duration(movieDuration, `minutes`).format(`h m`);

  return duration;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffMinutesValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`MINUTES_RANGE`]);
  const diffHoursValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`HOURS_RANGE`]);
  const diffDateValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`DATE_RANGE`]);

  targetDate.setMinutes(targetDate.getMinutes() + diffMinutesValue);
  targetDate.setHours(targetDate.getHours() + diffHoursValue);
  targetDate.setDate(targetDate.getDate() + diffDateValue);

  return targetDate;
};

const showElement = (element) => {
  element.classList.add(HIDDEN_CLASS);
};

const hideElement = (element) => {
  element.classList.remove(HIDDEN_CLASS);
};

const getWatchedFilms = (films) => {
  return generateFilters(films).history;
};

const getUserStatus = (films) => {
  const userStatusesKeys = USER_STATUSES.keys();

  const userStatusKey = [...userStatusesKeys].find((statusKey) => {
    console.log(getWatchedFilms(films), parseInt(statusKey, 10), getWatchedFilms(films) < parseInt(statusKey, 10));
    return getWatchedFilms(films) >= parseInt(statusKey, 10);
  });

  return USER_STATUSES.get(userStatusKey);
};

export {setCardClickEventListeners, getUserStatus, getFilmTotalDuration, getWatchedFilms, showElement, hideElement, getRandomDate, getFilmDuration, generateRandomArrayPiece, getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean, getPlural};
