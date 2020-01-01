import UserProfile from './components/user-profile';
import Menu from './components/menu';
import FilmsList from './components/films-lists';
import ShowMoreButton from './components/show-more-button';
import TopFilm from './components/top-film';
import FilmCard from "./components/film-card";
import FilmPopup from "./components/film-popup-template";
import NoData from "./components/no-data";
import Sorting from "./components/sorting";
import {CARDS_COUNT, RATES_CARDS_COUNT, CLICKABLE_ITEMS, RenderPosition, TOTAL_FILM_COUNT, TopFilmTypes} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {setCardClickEventListeners} from './utilities/utilities';
import {render} from './utilities/render';

let startPointSlice = 0;

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filters = generateFilters(generatedFilms);

const watchedFilms = filters.history;

const filmList = new FilmsList();
const showMoreButton = new ShowMoreButton();

const footerStatistic = footerNode.querySelector(`.footer__statistics p`);
footerStatistic.innerText = `${generatedFilms.length} movies inside`;

const renderFilm = (film, filmRenderPlace, popupRenderPlace) => {
  const card = new FilmCard(film);
  const filmPopup = new FilmPopup(film, popupRenderPlace);

  const onClosePopup = () => {
    filmPopup.getElement().remove();
    filmPopup.removeElement();

    document.removeEventListener(`keydown`, onClosePopup);
  };

  const onOpenPopup = () => {
    render(mainNode, filmPopup.getElement(), RenderPosition.BEFORE_END);
    const closePopupButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, onClosePopup);

    document.addEventListener(`keydown`, onClosePopup);
  };

  setCardClickEventListeners(CLICKABLE_ITEMS, card, onOpenPopup);

  render(filmRenderPlace, card.getElement(), RenderPosition.BEFORE_END);
};

const renderFilms = (films, filmRenderPlace, popupRenderPlace, sliceCount, slicePoint = 0) => {
  films.slice(slicePoint, slicePoint + sliceCount).forEach((film) => {
    renderFilm(film, filmRenderPlace, popupRenderPlace);
  });
};

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(generatedFilms, filters).getElement(), RenderPosition.AFTER_BEGIN);
render(mainNode, new Sorting().getElement(), RenderPosition.BEFORE_END);
render(mainNode, filmList.getElement(), RenderPosition.BEFORE_END);
const buttonRenderPlace = filmList.getElement().querySelector(`.films-list`);
const filmsRenderPlace = filmList.getElement().querySelector(`.films-list__container`);

if (generatedFilms.length < 1) {
  render(buttonRenderPlace, new NoData().getElement(), RenderPosition.BEFORE_END);
} else {
  renderFilms(generatedFilms, filmsRenderPlace, mainNode, CARDS_COUNT, startPointSlice);

  const ratedFilms = new TopFilm(generatedFilms, TopFilmTypes.RATING, filmList.getElement());
  const mostCommentedFilms = new TopFilm(generatedFilms, TopFilmTypes.COMMENTS, filmList.getElement());

  render(filmList.getElement(), ratedFilms.getElement(), RenderPosition.BEFORE_END);
  render(filmList.getElement(), mostCommentedFilms.getElement(), RenderPosition.BEFORE_END);

  const ratingPlace = ratedFilms.getElement().querySelector(`.films-list__container`);
  const commentsPlace = mostCommentedFilms.getElement().querySelector(`.films-list__container`);

  renderFilms(ratedFilms.getTopFilms(), ratingPlace, mainNode, RATES_CARDS_COUNT);
  renderFilms(mostCommentedFilms.getTopFilms(), commentsPlace, mainNode, RATES_CARDS_COUNT);

  render(buttonRenderPlace, showMoreButton.getElement(), RenderPosition.BEFORE_END);

  showMoreButton.getElement().addEventListener(`click`, () => {
    startPointSlice = startPointSlice <= TOTAL_FILM_COUNT - CARDS_COUNT
      ? startPointSlice + CARDS_COUNT
      : TOTAL_FILM_COUNT;

    if (startPointSlice + CARDS_COUNT > TOTAL_FILM_COUNT) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }

    renderFilms(generatedFilms, filmsRenderPlace, mainNode, CARDS_COUNT, startPointSlice);
  });
}


