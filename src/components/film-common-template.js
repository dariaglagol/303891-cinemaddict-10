import FilmCard from './film-card-template';
import {CARDS_COUNT, RenderPosition} from '../mocks/constants';
import {render} from "../utilities/utilities";

const renderFilm = (film, renderPlace) => {
  const card = new FilmCard(film);

  render(renderPlace, card.getElement(), RenderPosition.AFTER_BEGIN);
};

const renderFilms = (films, renderPlace, slicePoint) => {
  return films.slice(slicePoint, slicePoint + CARDS_COUNT).map((film) => {
    return renderFilm(film, renderPlace);
  }).join(`\n`);
};

export {renderFilms};
