import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {COMMENTS_TIME_RANGE} from "../mocks/constants";

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
  const startPiece = getRandomIntegerNumber(1, array.length - pieceLength);
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

export {setCardClickEventListeners, getRandomDate, getFilmDuration, generateRandomArrayPiece, getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean, getPlural};
