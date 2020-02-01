import AbstractComponent from "./abstract-component";
import Comment from './comment';

const createCommentsTemplate = (comments) => {
  const commentsTemplate = comments.map((comment) => {
    return new Comment(comment).getTemplate();
  }).join(``);

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
         ${commentsTemplate}
        </ul>
      </section>
    </div>`
  );
};

export default class Comments extends AbstractComponent {
  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  setComments(comments) {
    this._comments = comments;
  }
}
