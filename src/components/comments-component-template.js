import Comment from './comment-template';
import {createElement, render} from "../utilities/utilities";
import {RenderPosition} from "../mocks/constants";

const renderComment = (comment, renderPlace) => {
  const commentElement = new Comment(comment);

  render(renderPlace, commentElement.getElement(), RenderPosition.AFTER_BEGIN);
};

const createCommentsComponentTemplate = (comments) => {
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list"></ul>
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

  getCommentsList(renderPlace) {
    const commentsList = this._comments.map((comment) => {
      return renderComment(comment, renderPlace);
    }).join(``);

    return commentsList;
  }
}
