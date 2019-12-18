import {createCommentTemplate} from './comment-template';
import {createElement} from "../utilities/utilities";

const createCommentsComponentTemplate = (comments) => {
  const commentsList = comments.map((comment) => {
    return createCommentTemplate(comment);
  }).join(``);

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsList}
        </ul>

      </section>
    </div>`
  );
};

export default class CommentsComponent {
  constructor(comments) {
    this._element = null;
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsComponentTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
