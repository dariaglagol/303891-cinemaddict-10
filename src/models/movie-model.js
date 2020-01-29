export default class Movie {
  constructor(data) {
    this.filmName = data[`filmName`];
    this.rating = data[`rating`];
    this.posterUrl = data[`posterUrl`];
    this.releaseDate = data[`releaseDate`] ? new Date(data[`releaseDate`]) : null;
    this.movieDuration = data[`movieDuration`];
    this.genres = data[`genres`] || [];
    this.comments = data[`comments`] || [];
    this.description = data[`description`] || ``;
    this.isFavorite = Boolean(data[`isFavorite`]);
    this.isWatched = Boolean(data[`isWatched`]);
    this.isInWatchList = Boolean(data[`isInWatchList`]);
    this.ageRating = data[`ageRating`];
    this.actors = data[`actors`] || [];
    this.writers = data[`writers`] || [];
    this.director = data[`director`];
    this.country = data[`country`];
    this.id = data[`id`];
    this.watchingDate = data[`watchingDate`] ? new Date(data[`watchingDate`]) : null;
  }

  toRAW() {
    return {
      'filmName': this.filmName,
      'rating': this.rating,
      'posterUrl': this.posterUrl,
      'releaseDate': this.releaseDate,
      'movieDuration': this.movieDuration,
      'genres': this.genres,
      'comments': Array.form(this.comments),
      'description': this.description,
      'isFavorite': this.isFavorite,
      'isWatched': this.isWatched,
      'isInWatchList': this.isInWatchList,
      'ageRating': this.ageRating,
      'actors': this.actors,
      'writers': this.writers,
      'director': this.director,
      'country': this.country,
      'watchingDate': this.watchingDate.toISOString(),
      'id': this.id,
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
