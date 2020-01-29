import UserProfile from './components/user-profile';
import PageController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import Footer from "./components/footer";
import MoviesModel from "./models/movies-model";
import Statistic from "./components/statistic";
import {RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filmModel = new MoviesModel();

filmModel.setFilm(generatedFilms);

const statistic = new Statistic(filmModel);

const filterController = new FilterController(mainNode, statistic);
const pageController = new PageController(mainNode, filmModel, filterController);

render(headerNode, new UserProfile(filmModel).getElement(), RenderPosition.BEFORE_END);
filterController.render(filmModel);

pageController.render();

filterController.getPageController(pageController);
render(mainNode, statistic.getElement(), RenderPosition.BEFORE_END);

render(bodyNode, new Footer(generatedFilms.length).getElement(), RenderPosition.BEFORE_END);

