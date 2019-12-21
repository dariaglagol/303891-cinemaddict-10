import UserProfile from './components/user-profile-template';
import Menu from './components/menu';
import FilmListTemplate from './components/film-lists-template';
import ShowMoreButtonTemplate from './components/show-more-button-template';
import TopFilm from './components/top-raited-films';
import FilmCard from "./components/film-card-template";
import FilmPopup from "./components/film-popup-template";
import {CARDS_COUNT, RATES_CARDS_COUNT, CLICKABLE_ITEMS, RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render, toggleEventListeners} from './utilities/utilities';

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

const renderFilm = (film, filmRenderPlace, popupRenderPlace) => {
  const card = new FilmCard(film);
  const filmPopup = new FilmPopup(film, popupRenderPlace);

  const handleClosePopup = () => {
    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);

    closePopupButton.removeEventListener(`click`, handleClosePopup);

    filmPopup.getElement().remove();
    filmPopup.removeElement();
  };

  const handleOpenPopup = () => {
    render(mainNode, filmPopup.getElement(), RenderPosition.BEFORE_END);
    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, handleClosePopup);
  };

  toggleEventListeners(CLICKABLE_ITEMS, card, handleOpenPopup);

  render(filmRenderPlace, card.getElement(), RenderPosition.AFTER_BEGIN);
};

const renderFilms = (filmsList, filmRenderPlace, popupRenderPlace, sliceCount, slicePoint = 0,) => {
  filmsList.slice(slicePoint, slicePoint + sliceCount).forEach((film) => {
    renderFilm(film, filmRenderPlace, popupRenderPlace);
  });
};

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(films, filters).getElement(), RenderPosition.AFTER_BEGIN);
render(mainNode, filmListTemplate.getElement(), RenderPosition.BEFORE_END);
const buttonRenderPlace = filmListTemplate.getElement().querySelector(`.films-list`);
const filmsRenderPlace = filmListTemplate.getElement().querySelector(`.films-list__container`);

renderFilms(films, filmsRenderPlace, mainNode, CARDS_COUNT, startPointSlice);

const ratedFilm = new TopFilm(films, `rating`, filmListTemplate.getElement());
const mostCommentedFilms = new TopFilm(films, `comments`, filmListTemplate.getElement());

render(filmListTemplate.getElement(), ratedFilm.getWrapperElement(), RenderPosition.BEFORE_END);
render(filmListTemplate.getElement(), mostCommentedFilms.getWrapperElement(), RenderPosition.BEFORE_END);

const ratingPlace = ratedFilm.getWrapperElement().querySelector(`.films-list__container`);
const commentsPlace = mostCommentedFilms.getWrapperElement().querySelector(`.films-list__container`);

renderFilms(ratedFilm.getTopFilms(), ratingPlace, mainNode, RATES_CARDS_COUNT);
renderFilms(ratedFilm.getTopFilms(), commentsPlace, mainNode, RATES_CARDS_COUNT);

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
