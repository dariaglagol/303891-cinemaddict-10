import AbstractComponent from "./abstract-component";

import {COMMENTS_EMODJIES} from '../mocks/constants';
import {createElement} from '../utilities/render';

const getEmojiLabel = (emoji) => {
  return (`<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`);
};

const getEmojiTemplate = () => {
  const createEmojiTemplate = (emoji) => {
    return (`
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji" data-emoji-type="${emoji}">
      </label>`);
  };

  return COMMENTS_EMODJIES.map((emoji) => {
    if (emoji === `trophy`) {
      return ``;
    }
    return createEmojiTemplate(emoji);
  }).join(``);
};

const createCommentForm = () => {
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${getEmojiTemplate()}
      </div>
    </div>`
  );
};

export default class CommentForm extends AbstractComponent {
  constructor() {
    super();

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentForm();
  }

  _subscribeOnEvents() {
    const emojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          const target = evt.target;
          const emojiType = target.dataset.emojiType;
          const emoji = createElement(getEmojiLabel(emojiType));

          if (emojiLabel.children.length) {
            emojiLabel.children[0].remove();
          }

          emojiLabel.appendChild(emoji);
        });
      });
  }
}
