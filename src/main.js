import UserProfile from './components/user-profile-template';
import Menu from './components/menu';
import FilmListTemplate from './components/film-lists-template';
import ShowMoreButtonTemplate from './components/show-more-button-template';
import TopRatedFilm from './components/top-raited-films';
import FilmPopup from './components/film-popup-template';
import RatingForm from "./components/rating-form";
import CommentsComponent from './components/comments-component-template';
import CommentForm from './components/comment-form';
import {CARDS_COUNT, COMMENTS_COUNT, RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {renderFilms} from './components/film-common-template';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {getRandomArrayItem, render} from './utilities/utilities';
import {generateComments} from "./mocks/comment";

let startPointSlice = 0;

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const films = generateFilms(TOTAL_FILM_COUNT);

const filters = generateFilters(films);
const randomFilm = getRandomArrayItem(films);
const comments = generateComments(COMMENTS_COUNT);
const watchedFilms = filters.history;

const filmListTemplate = new FilmListTemplate();
const showMoreButton = new ShowMoreButtonTemplate();

const filmPopup = new FilmPopup(randomFilm);
const ratingForm = new RatingForm(randomFilm);
const commentsComponent = new CommentsComponent(comments);
const commentForm = new CommentForm();

const footerStatistic = footerNode.querySelector(`.footer__statistics p`);
footerStatistic.innerText = `${films.length} movies inside`;

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(films, filters).getElement(), RenderPosition.AFTER_BEGIN);
render(mainNode, filmListTemplate.getElement(), RenderPosition.BEFORE_END);
const buttonRenderPlace = filmListTemplate.getElement().querySelector(`.films-list`);
const filmsRenderPlace = filmListTemplate.getElement().querySelector(`.films-list__container`);

renderFilms(films, filmsRenderPlace, startPointSlice);

const topRatedFilm = new TopRatedFilm(films, `rating`, filmListTemplate.getElement());
const mostCommentedFilms = new TopRatedFilm(films, `comments`, filmListTemplate.getElement());

render(filmListTemplate.getElement(), topRatedFilm.getWrapperElement(), RenderPosition.BEFORE_END);
render(filmListTemplate.getElement(), mostCommentedFilms.getWrapperElement(), RenderPosition.BEFORE_END);

topRatedFilm.getCardsElement(topRatedFilm.getWrapperElement());
mostCommentedFilms.getCardsElement(mostCommentedFilms.getWrapperElement());

render(buttonRenderPlace, showMoreButton.getElement(), RenderPosition.BEFORE_END);

showMoreButton.getElement().addEventListener(`click`, () => {
  startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
    ? startPointSlice + CARDS_COUNT
    : TOTAL_FILM_COUNT;

  if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
    showMoreButton.getElement().remove();
    showMoreButton.removeElement();
  }

  renderFilms(films, filmsRenderPlace, startPointSlice);
});

render(mainNode, filmPopup.getElement(), RenderPosition.BEFORE_END);
render(filmPopup.getElement(), ratingForm.getElement(), RenderPosition.BEFORE_END);
render(filmPopup.getElement(), commentsComponent.getElement(), RenderPosition.BEFORE_END);
render(commentsComponent.getElement(), commentForm.getElement(), RenderPosition.BEFORE_END);
commentsComponent.getCommentsList(commentsComponent.getElement());
