import UserProfile from './components/user-profile';
import Menu from './components/menu';
import PageController from "./controllers/page-controller";
import Footer from "./components/footer";
import {RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const pageController = new PageController(mainNode);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filters = generateFilters(generatedFilms);

const watchedFilms = filters.history;

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
render(mainNode, new Menu(generatedFilms, filters).getElement(), RenderPosition.AFTER_BEGIN);
pageController.render(generatedFilms);
render(bodyNode, new Footer(generatedFilms.length).getElement(), RenderPosition.BEFORE_END);

