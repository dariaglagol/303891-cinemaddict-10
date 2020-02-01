import AbstractComponent from "./abstract-component";

const createFilmListsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          <style>
            @keyframes shake {
              0%,
              100% {
                transform: translateX(0);
              }

              10%,
              30%,
              50%,
              70%,
              90% {
                transform: translateX(-5px);
              }

              20%,
              40%,
              60%,
              80% {
                transform: translateX(5px);
              }
            }
            .shake {
              animation: shake 0.6s;
            }
            .film-details__comment-input--error {
                border: solid 3px red;
            }
            .film-details__user-rating-input:checked + .film-details__user-rating-label--error {
                background-color: red;
            }
            .film-details__control-input:checked + .film-details__control-label--error {
                opacity: 0.3;
            }
          </style>
        </div>
      </section>
     </section>`
  );
};

export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmListsTemplate();
  }
}
