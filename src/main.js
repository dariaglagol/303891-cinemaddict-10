import UserProfile from './components/user-profile';
import Menu from './components/menu';
import FilmsList from './components/films-lists';
import PageController from "./controllers/page-controller";
import Sorting from "./components/sorting";
import {RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render} from './utilities/render';

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const footerNode = document.querySelector(`.footer`);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filters = generateFilters(generatedFilms);

const watchedFilms = filters.history;

const filmList = new FilmsList();

const footerStatistic = footerNode.querySelector(`.footer__statistics p`);
footerStatistic.innerText = `${generatedFilms.length} movies inside`;

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(generatedFilms, filters).getElement(), RenderPosition.AFTER_BEGIN);
render(mainNode, new Sorting().getElement(), RenderPosition.BEFORE_END);
render(mainNode, filmList.getElement(), RenderPosition.BEFORE_END);

const pageController = new PageController(mainNode);
pageController.render(generatedFilms);
