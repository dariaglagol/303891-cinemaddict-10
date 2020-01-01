import AbstractComponent from "./abstract-component";

const noDataTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoData extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return noDataTemplate();
  }
}
