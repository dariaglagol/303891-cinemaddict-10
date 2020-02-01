export default class MovieModel {
  constructor(film) {
    const filmInfo = film[`film_info`];
    const userDetails = film[`user_details`];
    this.filmName = filmInfo[`title`];
    this.alternativeFilmName = filmInfo[`alternative_title`];
    this.rating = filmInfo[`total_rating`];
    this.posterUrl = filmInfo[`poster`];
    this.releaseDate = filmInfo[`release`][`date`] ? new Date(filmInfo[`release`][`date`]) : null;
    this.movieDuration = filmInfo[`runtime`];
    this.genres = filmInfo[`genre`] || [];
    this.comments = film[`comments`] || [];
    this.description = filmInfo[`description`] || ``;
    this.isFavorite = Boolean(userDetails[`favorite`]);
    this.isWatched = Boolean(userDetails[`already_watched`]);
    this.isInWatchList = Boolean(userDetails[`watchlist`]);
    this.ageRating = filmInfo[`age_rating`];
    this.actors = filmInfo[`actors`] || [];
    this.writers = filmInfo[`writers`] || [];
    this.director = filmInfo[`director`];
    this.country = filmInfo[`release`][`release_country`];
    this.id = film[`id`];
    this.personalRating = userDetails[`personal_rating`];
    this.watchingDate = userDetails[`watching_date`] ? new Date(userDetails[`watching_date`]) : null;
  }

  toRAW() {
    return {
      'film_info': {
        'title': this.filmName,
        'alternative_title': this.alternativeFilmName,
        'total_rating': this.rating,
        'poster': this.posterUrl,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country
        },
        'runtime': this.movieDuration,
        'genre': this.genres,
        'description': this.description,
        'age_rating': this.ageRating,
        'actors': this.actors,
        'writers': this.writers,
        'director': this.director,
      },
      'user_details': {
        'favorite': this.isFavorite,
        'already_watched': this.isWatched,
        'watchlist': this.isInWatchList,
        'personal_rating': this.personalRating,
        'watching_date': new Date(this.watchingDate).toISOString(),
      },
      'comments': this.comments,
      'id': this.id
    };
  }

  static parseFilm(film) {
    return new MovieModel(film);
  }

  static parseFilms(films) {
    return films.map(MovieModel.parseFilm);
  }

  static clone(film) {
    return new MovieModel(film.toRAW());
  }
}
