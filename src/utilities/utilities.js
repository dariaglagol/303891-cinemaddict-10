import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {USER_STATUSES} from "../mocks/constants";
import {generateFilters} from "../mocks/filters";

momentDurationFormatSetup(moment);

const getPlural = (count, one, more) => {
  return count > 1 || count === 0 ? more : one;
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
  const hours = moment.duration(movieDuration, `minutes`).format(`h`);
  const minutes = moment.duration(movieDuration - (hours * 60), `minutes`).format(`m`);

  return {hours, minutes};
};

const getWatchedFilms = (films) => {
  return generateFilters(films).history;
};

const getUserStatus = (films) => {
  const userStatusesKeys = USER_STATUSES.keys();

  const userStatusKey = [...userStatusesKeys].find((statusKey) => {
    return getWatchedFilms(films) >= parseInt(statusKey, 10);
  });

  return USER_STATUSES.get(userStatusKey);
};

export {setCardClickEventListeners, getUserStatus, getFilmTotalDuration, getWatchedFilms, getFilmDuration, getPlural};
