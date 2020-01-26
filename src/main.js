import UserProfile from './components/user-profile';
import PageController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import Footer from "./components/footer";
import MoviesModel from "./models/movies-model";
import {RenderPosition, TOTAL_FILM_COUNT} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filmModel = new MoviesModel();

filmModel.setFilm(generatedFilms);

const watchedFilms = generateFilters(filmModel.getAllFilms()).history;

const filterController = new FilterController(mainNode, filmModel);
const pageController = new PageController(mainNode, filmModel, filterController);

render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
filterController.render(filmModel);
pageController.render();
render(bodyNode, new Footer(generatedFilms.length).getElement(), RenderPosition.BEFORE_END);

