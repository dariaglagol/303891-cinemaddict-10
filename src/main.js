import UserProfile from './components/user-profile-template';
import MenuTemplate from './components/menu-template';
import FilmListTemplate from './components/film-lists-template';
import ShowMoreButtonTemplate from './components/show-more-button-template';
import {createFilmPopupTemplate} from './components/film-popup-template';
import {CARDS_COUNT, COMMENTS_COUNT, RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {createAdditionalFilms} from './components/film-common-template';
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

const render = (template, container, position = `beforeEnd`) => {
  return (
    container.insertAdjacentHTML(position, template)
  );
};

const filmListTemplate = new FilmListTemplate(films);
const showMoreButton = new ShowMoreButtonTemplate();

newRender(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
newRender(mainNode, new MenuTemplate(films, filters, `all movies`).getElement(), RenderPosition.AFTER_BEGIN);
newRender(mainNode, filmListTemplate.getElement(), RenderPosition.BEFORE_END);

const buttonRenderPlace = filmListTemplate.getElement().querySelector(`.films-list`);
newRender(buttonRenderPlace, showMoreButton.getElement(), RenderPosition.BEFORE_END);

const commonFilmList = mainNode.querySelector(`.films-list__container`);

showMoreButton.getElement().addEventListener(`click`, () => {
  startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
    ? startPointSlice + CARDS_COUNT
    : TOTAL_FILM_COUNT;

  if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }

  const addCardTemplates = createAdditionalFilms(films, startPointSlice);

  render(addCardTemplates, commonFilmList);
});

// render(createFilmPopupTemplate(randomFilm, comments), footerNode, `afterEnd`);
