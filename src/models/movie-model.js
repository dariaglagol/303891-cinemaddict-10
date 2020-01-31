export default class Movie {
  constructor(data) {
    console.log(data);
    const {film_info, user_details} = data;
    this.filmName = film_info[`title`];
    this.alternativeFilmName = film_info[`alternative_title`];
    this.rating = film_info[`total_rating`];
    this.posterUrl = film_info[`poster`];
    this.releaseDate = film_info[`release`][`date`] ? new Date(film_info[`release`][`date`]) : null;
    this.movieDuration = film_info[`runtime`];
    this.genres = film_info[`genre`] || [];
    this.comments = data[`comments`] || [];
    this.description = film_info[`description`] || ``;
    this.isFavorite = Boolean(user_details[`favorite`]);
    this.isWatched = Boolean(user_details[`already_watched`]);
    this.isInWatchList = Boolean(user_details[`watchlist`]);
    this.ageRating = film_info[`age_rating`];
    this.actors = film_info[`actors`] || [];
    this.writers = film_info[`writers`] || [];
    this.director = film_info[`director`];
    this.country = film_info[`release`][`release_country`];
    this.id = data[`id`];
    this.personalRating = user_details[`personal_rating`];
    this.watchingDate = user_details[`watching_date`] ? new Date(user_details[`watching_date`]) : null;
  }

  toRAW() {
    return {
      'title': this.filmName,
      'alternative_title': this.alternativeFilmName,
      'total_rating': this.rating,
      'poster': this.posterUrl,
      'releaseDate': {
        'release': this.releaseDate,
        'release_country': this.country
      },
      'runtime': this.movieDuration,
      'genre': this.genres,
      'comments': Array.form(this.comments),
      'description': this.description,
      'favorite': this.isFavorite,
      'already_watched': this.isWatched,
      'watchlist': this.isInWatchList,
      'age_rating': this.ageRating,
      'actors': this.actors,
      'writers': this.writers,
      'director': this.director,
      'watching_date': this.watchingDate.toISOString(),
      'id': this.id,
      'personal_rating': this.personalRating,
    };
  }

  static parseFilm(data) {
    return new Movie(data);
  }

  static parseFilms(data) {
    return data.map(Movie.parseFilm);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
