import {USER_STATUSES} from '../mocks/constants';
import {createElement} from '../utilities/utilities';

const createUserProfileTemplate = (watchedFilms) => {
  const userStatusesKeys = USER_STATUSES.keys();

  const userStatusKey = [...userStatusesKeys].find((statusKey) => {
    return watchedFilms < parseInt(statusKey, 10);
  });

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${USER_STATUSES.get(userStatusKey)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile {
  constructor(watchedFilms) {
    this._element = null;
    this._watchedFilms = watchedFilms;
  }

  getTemplate() {
    return createUserProfileTemplate(this._watchedFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
