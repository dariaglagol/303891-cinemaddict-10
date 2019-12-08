import {
  MAX_AGE_RATING,
  Year,
  MAX_VALUE,
  Duration,
  Rating,
  FILM_NAMES,
  COUTRIES,
  POSTERS,
  GENRES,
  DIRECTORS,
  ACTORS,
  WRITERS,
  INITIAL_DESCRIPTION_TEXT,
  COMMENTS_COUNT,
} from './constants';
import {getRandomArrayItem, generateRandomArrayPiece, getRandomIntegerNumber, getRandomBoolean} from './utilities';
import {generateComments} from "./comment";

const getRatingInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return parseFloat(rand.toFixed(1));
};

const getRating = () => getRatingInteger(Rating.MIN, Rating.MAX);

const generateDescription = () => {
  const descriptionPieces = INITIAL_DESCRIPTION_TEXT.split(`. `);
  return generateRandomArrayPiece(MAX_VALUE, descriptionPieces).join(``);
};

const generateGenres = () => {
  return generateRandomArrayPiece(MAX_VALUE, GENRES);
};

const generateActors = () => {
  const pieceLength = getRandomIntegerNumber(2, MAX_VALUE);
  const startPiece = getRandomIntegerNumber(1, ACTORS.length - pieceLength);
  return ACTORS.slice(startPiece, startPiece + pieceLength);
};

const generateWriters = () => {
  const genresLength = getRandomIntegerNumber(1, MAX_VALUE);
  const genresStartPiece = getRandomIntegerNumber(1, WRITERS.length - genresLength);
  return WRITERS.slice(genresStartPiece, genresStartPiece + genresLength).join(`, `);
};

const generateFilm = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    rating: getRating(),
    posterUrl: getRandomArrayItem(POSTERS),
    releaseYear: getRandomIntegerNumber(Year.MIN, Year.MAX),
    movieDuration: getRandomIntegerNumber(Duration.MIN, Duration.MAX),
    genres: generateGenres(),
    comments: generateComments(COMMENTS_COUNT),
    description: generateDescription(),
    isFavorite: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isInWatchList: getRandomBoolean(),
    ageRating: getRandomIntegerNumber(1, MAX_AGE_RATING),
    actors: generateActors(),
    writers: generateWriters(),
    director: getRandomArrayItem(DIRECTORS),
    country: getRandomArrayItem(COUTRIES)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
