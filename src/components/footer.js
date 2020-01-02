import AbstractComponent from "./abstract-component";

const createFooter = (filmsCount) => {
  return (`
    <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>${filmsCount} movies inside</p>
      </section>
    </footer>
  `);
};

export default class Footer extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooter(this._filmsCount);
  }
}
