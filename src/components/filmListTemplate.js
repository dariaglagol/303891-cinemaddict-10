export const createFilmListTemplate = (longListCards, shortListCards, showMoreButton) => {
  return `
    <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">${longListCards}</div>
      ${showMoreButton}
    </section>
  
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        ${shortListCards}
      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${shortListCards}
      </div>
    </section>
  </section>
  `;
};
