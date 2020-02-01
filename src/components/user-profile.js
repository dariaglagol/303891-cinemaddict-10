import AbstractComponent from "./abstract-component";
import {getUserStatus} from "../utilities/utilities";

const createUserProfileTemplate = (status) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${status}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractComponent {
  getTemplate() {
    return createUserProfileTemplate(this._userStatus);
  }

  setUserStatus(filmModel) {
    this._userStatus = getUserStatus(filmModel.getAllFilms());
  }
}
