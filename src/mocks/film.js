import moment from "moment";
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
import {getRandomArrayItem, generateRandomArrayPiece, getRandomIntegerNumber, getRandomBoolean} from '../utilities/utilities';
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
  const writersLength = getRandomIntegerNumber(1, MAX_VALUE);
  const writersStartPiece = getRandomIntegerNumber(1, WRITERS.length - writersLength);
  return WRITERS.slice(writersStartPiece, writersStartPiece + writersLength).join(`, `);
};

const generateReleaseDate = () => {
  const year = getRandomIntegerNumber(Year.MIN, Year.MAX);
  const month = getRandomIntegerNumber(0, 11);
  const day = getRandomIntegerNumber(1, 31);

  return new Date(year, month, day);
};

const generateWatchDate = (isWatched) => {
  if (isWatched) {
    const year = getRandomIntegerNumber(2017, 2020);
    const month = getRandomIntegerNumber(0, 11);
    const day = getRandomIntegerNumber(1, 31);

    const date = new Date(year, month, day);
    const todayDate = new Date();

    if (moment(date).isSameOrAfter(todayDate)) {
      generateWatchDate(isWatched);
    }

    return date;
  }

  return null;
};

const generateFilm = (id) => {
  const isWatched = getRandomBoolean();
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    rating: getRating(),
    posterUrl: getRandomArrayItem(POSTERS),
    releaseDate: generateReleaseDate(),
    movieDuration: getRandomIntegerNumber(Duration.MIN, Duration.MAX),
    genres: generateGenres(),
    comments: generateComments(COMMENTS_COUNT),
    description: generateDescription(),
    isFavorite: getRandomBoolean(),
    isWatched,
    isInWatchList: getRandomBoolean(),
    ageRating: getRandomIntegerNumber(1, MAX_AGE_RATING),
    actors: generateActors(),
    writers: generateWriters(),
    director: getRandomArrayItem(DIRECTORS),
    country: getRandomArrayItem(COUTRIES),
    id,
    watchingDate: generateWatchDate(isWatched)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map((item, index) => generateFilm(index));
};

export {generateFilm, generateFilms};
