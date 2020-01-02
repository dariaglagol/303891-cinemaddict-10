import AbstractComponent from "./abstract-component";

const createCommentTemplate = (comment) => {
  const {
    emoji,
    text,
    author,
    date
  } = comment;

  const formatDatePart = (part) => part > 0 ? part : `0${part}`;

  const formatDate = `${date.getFullYear()}/${formatDatePart(date.getMonth())}/${formatDatePart(date.getDate())} ${date.getHours()}:${date.getMinutes()}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
