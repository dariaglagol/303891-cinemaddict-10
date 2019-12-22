import {createElement} from "../utilities/utilities";

const noDataTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return noDataTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
