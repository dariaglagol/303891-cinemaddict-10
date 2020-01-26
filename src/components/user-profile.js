import AbstractComponent from "./abstract-component";
import {USER_STATUSES} from '../mocks/constants';

const createUserProfileTemplate = (status) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractComponent {
  constructor(status) {
    super();
    this._status = status;
  }

  getTemplate() {
    return createUserProfileTemplate(this._status);
  }
}
