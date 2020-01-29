import Api from './api';
import UserProfile from './components/user-profile';
import PageController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import Footer from "./components/footer";
import MoviesModel from "./models/movies-model";
import {RenderPosition, AUTHORIZATION, END_POINT} from './mocks/constants';
import {generateFilters} from './mocks/filters';
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const api = new Api(AUTHORIZATION, END_POINT);
const filmModel = new MoviesModel();

api.getFilms()
  .then((films) => {
    filmModel.setFilm(films);
    const watchedFilms = generateFilters(filmModel.getAllFilms()).history;

    const filterController = new FilterController(mainNode, filmModel);
    const pageController = new PageController(mainNode, filmModel, filterController);

    render(headerNode, new UserProfile(watchedFilms).getElement(), RenderPosition.BEFORE_END);
    filterController.render(filmModel);
    pageController.render();
    render(bodyNode, new Footer(films.length).getElement(), RenderPosition.BEFORE_END);
  });
