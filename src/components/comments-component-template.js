import {createCommentTemplate} from './comment-template';
import {createCommentForm} from './comment-form';

export const createCommentsComponentTemplate = (comments) => {
  const commentsList = comments.map((comment) => {
    return createCommentTemplate(comment);
  }).join(``);

  return `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsList}
      </ul>

      ${createCommentForm()}
    </section>
  `;
};
