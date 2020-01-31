import Movie from './models/movie-model';
import Comment from './models/comment-model';
import {Method} from './mocks/constants';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(authorization, endPoint) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseFilms);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  addComment(movieId, data) {
    console.log(data);
    return this._load({
      url: `comments/${movieId}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  deleteComment(id) {
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
