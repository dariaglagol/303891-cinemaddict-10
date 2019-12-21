import UserProfile from './components/user-profile-template';
import Menu from './components/menu';
import FilmListTemplate from './components/film-lists-template';
import ShowMoreButtonTemplate from './components/show-more-button-template';
import TopRatedFilm from './components/top-raited-films';
import {CARDS_COUNT, RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {renderFilms} from './components/film-common-template';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render} from './utilities/utilities';

let startPointSlice = 0;

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const films = generateFilms(TOTAL_FILM_COUNT);

const filters = generateFilters(films);
const watchedFilms = filters.history;

const filmListTemplate = new FilmListTemplate();
const showMoreButton = new ShowMoreButtonTemplate();

const footerStatistic = footerNode.querySelector(`.footer__statistics p`);
footerStatistic.innerText = `${films.length} movies inside`;

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(films, filters).getElement(), RenderPosition.AFTER_BEGIN);
render(mainNode, filmListTemplate.getElement(), RenderPosition.BEFORE_END);
const buttonRenderPlace = filmListTemplate.getElement().querySelector(`.films-list`);
const filmsRenderPlace = filmListTemplate.getElement().querySelector(`.films-list__container`);

renderFilms(films, filmsRenderPlace, mainNode, startPointSlice);

const topRatedFilm = new TopRatedFilm(films, `rating`, filmListTemplate.getElement());
const mostCommentedFilms = new TopRatedFilm(films, `comments`, filmListTemplate.getElement());

render(filmListTemplate.getElement(), topRatedFilm.getWrapperElement(), RenderPosition.BEFORE_END);
render(filmListTemplate.getElement(), mostCommentedFilms.getWrapperElement(), RenderPosition.BEFORE_END);

topRatedFilm.getCardsElement(topRatedFilm.getWrapperElement(), mainNode);
mostCommentedFilms.getCardsElement(mostCommentedFilms.getWrapperElement(), mainNode);

render(buttonRenderPlace, showMoreButton.getElement(), RenderPosition.BEFORE_END);

showMoreButton.getElement().addEventListener(`click`, () => {
  startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
    ? startPointSlice + CARDS_COUNT
    : TOTAL_FILM_COUNT;

  if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }

  renderFilms(films, filmsRenderPlace, mainNode, startPointSlice);
});
