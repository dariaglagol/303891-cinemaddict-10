import UserProfile from './components/user-profile-template';
import MenuTemplate from './components/menu-template';
import FilmListTemplate from './components/film-lists-template';
import ShowMoreButtonTemplate from './components/show-more-button-template';
import TopRatedFilm from './components/top-raited-films';
import {createFilmPopupTemplate} from './components/film-popup-template';
import {CARDS_COUNT, COMMENTS_COUNT, RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {createFirstFilms} from './components/film-common-template';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {getRandomArrayItem, newRender} from './utilities/utilities';
import {generateComments} from "./mocks/comment";

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const films = generateFilms(TOTAL_FILM_COUNT);

const footerStatistic = footerNode.querySelector(`.footer__statistics p`);
footerStatistic.innerText = `${films.length} movies inside`;

const filters = generateFilters(films);
const randomFilm = getRandomArrayItem(films);
const comments = generateComments(COMMENTS_COUNT);
const watchedFilms = filters.history;

let startPointSlice = 0;

const filmListTemplate = new FilmListTemplate(films);
const showMoreButton = new ShowMoreButtonTemplate();

newRender(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
newRender(mainNode, new MenuTemplate(films, filters, `all movies`).getElement(), RenderPosition.AFTER_BEGIN);
newRender(mainNode, filmListTemplate.getElement(), RenderPosition.BEFORE_END);

const buttonRenderPlace = filmListTemplate.getElement().querySelector(`.films-list`);
const filmsRenderPlace = filmListTemplate.getElement().querySelector(`.films-list__container`);

createFirstFilms(films, filmsRenderPlace, startPointSlice);

const topRatedFilms = new TopRatedFilm(films, `rating`, filmListTemplate.getElement());
const mostCommentedFilms = new TopRatedFilm(films, `comments`, filmListTemplate.getElement());

newRender(filmListTemplate.getElement(), topRatedFilms.getWrapperElement(), RenderPosition.BEFORE_END);
newRender(filmListTemplate.getElement(), mostCommentedFilms.getWrapperElement(), RenderPosition.BEFORE_END);

topRatedFilms.getCardsElement(topRatedFilms.getWrapperElement());
mostCommentedFilms.getCardsElement(mostCommentedFilms.getWrapperElement());

newRender(buttonRenderPlace, showMoreButton.getElement(), RenderPosition.BEFORE_END);

showMoreButton.getElement().addEventListener(`click`, () => {
  startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
    ? startPointSlice + CARDS_COUNT
    : TOTAL_FILM_COUNT;

  if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }

  createFirstFilms(films, filmsRenderPlace, startPointSlice);
});

// render(createFilmPopupTemplate(randomFilm, comments), footerNode, `afterEnd`);
