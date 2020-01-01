import Comment from './comment';
import {render} from "../utilities/render";
import {RenderPosition} from "../mocks/constants";
import AbstractComponent from "./abstract-component";

const renderComment = (comment, renderPlace) => {
  const commentItem = new Comment(comment);

  render(renderPlace, commentItem.getElement(), RenderPosition.AFTER_BEGIN);
};

const createCommentsTemplate = (comments) => {
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list"></ul>
      </section>
    </div>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  getCommentsList(renderPlace) {
    this._comments.forEach((comment) => {
      renderComment(comment, renderPlace);
    });
  }
}
