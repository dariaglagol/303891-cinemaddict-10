import {USER_STATUSES} from '../mocks/constants';

export const createUserProfileTemplate = (watchedFilms) => {
  const userStatusesKeys = Object.keys(USER_STATUSES);

  const userStatusKey = userStatusesKeys.find((status) => {
    return watchedFilms < parseInt(status, 10);
  });

  return `
    <section class="header__profile profile">
      <p class="profile__rating">${ USER_STATUSES[userStatusKey]}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};
