import {createcommentTemplate} from './comment-template';
import {createCommentForm} from './comment-form';
import {COMMENTS} from '../mocks/constants';

export const createCommentsComponentTemplate = (comments) => {
  const commentsList = COMMENTS.map((comment) => {
    return createcommentTemplate(comment);
  }).join(``);

  return `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsList}
      </ul>

      ${createCommentForm()}
    </section>
  `;
};
