import {createElement} from "../utilities/render";
import {HIDDEN_CLASS} from '../mocks/constants';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    console.log(this._element);
    if (this._element) {
      console.log(this._element);
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      console.log('hide', this._element);
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
