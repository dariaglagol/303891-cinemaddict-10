import Api from './api';
import UserProfile from './components/user-profile';
import PageController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import Footer from "./components/footer";
import MoviesModel from "./models/movies-model";
import Statistic from "./components/statistic";
import Loading from "./components/loading";
import {RenderPosition, AUTHORIZATION, END_POINT} from './mocks/constants';
import {render} from './utilities/render';

const bodyNode = document.querySelector(`body`);
const headerNode = bodyNode.querySelector(`.header`);
const mainNode = bodyNode.querySelector(`.main`);

const loading = new Loading();
const loadingNode = loading.getElement();
const api = new Api(AUTHORIZATION, END_POINT);
const filmModel = new MoviesModel();

render(mainNode, loadingNode, RenderPosition.BEFORE_END);

api.getFilms()
  .then((films) => {
    filmModel.setFilm(films);
    const statistic = new Statistic(filmModel);
    const userProfile = new UserProfile();
    userProfile.setUserStatus(filmModel);
    const filterController = new FilterController(mainNode, statistic);
    const pageController = new PageController(mainNode, filmModel, filterController, api);
    render(headerNode, userProfile.getElement(), RenderPosition.BEFORE_END);
    filterController.render(filmModel);

    pageController.render();

    filterController.getPageController(pageController);
    render(mainNode, statistic.getElement(), RenderPosition.BEFORE_END);
    render(bodyNode, new Footer(films.length).getElement(), RenderPosition.BEFORE_END);
  }).finally(() => {
    loading.getElement().remove();
    loading.removeElement();
  });
