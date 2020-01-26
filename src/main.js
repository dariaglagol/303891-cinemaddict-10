import UserProfile from './components/user-profile';
import PageController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import Footer from "./components/footer";
import MoviesModel from "./models/movies-model";
import Statistic from "./components/statistic";
import {RenderPosition, TOTAL_FILM_COUNT, USER_STATUSES} from './mocks/constants';
import {generateFilms} from "./mocks/film";
import {generateFilters} from './mocks/filters';
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const generatedFilms = generateFilms(TOTAL_FILM_COUNT);

const filmModel = new MoviesModel();

const watchedFilms = generateFilters(filmModel.getAllFilms()).history;

const userStatusesKeys = USER_STATUSES.keys();

const userStatusKey = [...userStatusesKeys].find((statusKey) => {
  return watchedFilms < parseInt(statusKey, 10);
});

const userStatus = USER_STATUSES.get(userStatusKey);

const statistic = new Statistic(userStatus);

filmModel.setFilm(generatedFilms);

const pageController = new PageController(mainNode, filmModel);
const filterController = new FilterController(mainNode, filmModel);

render(headerNode, new UserProfile(userStatus).getElement(), RenderPosition.BEFORE_END);
filterController.render();
pageController.render();
render(mainNode, statistic.getElement(), RenderPosition.BEFORE_END);
filterController.setStatisticState();
render(bodyNode, new Footer(generatedFilms.length).getElement(), RenderPosition.BEFORE_END);

