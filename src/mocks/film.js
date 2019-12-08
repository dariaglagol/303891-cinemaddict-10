import {MAX_AGE_RATING, MAX_COMMENTS_COUNT, MAX_YEAR, MIN_YEAR, MAX_VALUE, MIN_HOURS_DURATION, MAX_MINUTES_DURATION, MIN_MINUTES_DURATION, MIN_RAITING, MAX_RAITING, FILM_NAMES, COUTRIES, POSTERS, GENRES, DIRECTORS, ACTORS, WRITERS, INITIAL_DESCRIPTION_TEXT} from './constants';
import {getRandomArrayItem, generateRandomArrayPiece, getRandomIntegerNumber, getRandomBoolean} from './utilities';

const getRatingInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return parseFloat(rand.toFixed(1));
};

const rating = () => getRatingInteger(MIN_RAITING, MAX_RAITING);

const generateMovieDuration = () => {
  const isLongDuration = getRandomBoolean();
  const hours = isLongDuration ? `${getRandomIntegerNumber(MIN_HOURS_DURATION, MAX_VALUE)}h ` : ``;
  return `${hours}${getRandomIntegerNumber(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION)}m`;
};

const generateDescription = () => {
  const descriptionPieces = INITIAL_DESCRIPTION_TEXT.split(`. `);
  return generateRandomArrayPiece(MAX_VALUE, descriptionPieces).join(``);
};

const genetateGenres = () => {
  return generateRandomArrayPiece(MAX_VALUE, GENRES).join(` `);
};

const generateActors = () => {
  return generateRandomArrayPiece(MAX_VALUE, ACTORS).join(`, `);
};

const generateWriters = () => {
  const genresLength = getRandomIntegerNumber(1, MAX_VALUE);
  const genresStartPiece = getRandomIntegerNumber(1, WRITERS.length - genresLength);
  return WRITERS.slice(genresStartPiece, genresStartPiece + genresLength).join(`, `);
};

const generateFilm = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAMES),
    rating: rating(),
    posterUrl: getRandomArrayItem(POSTERS),
    releaseYear: getRandomIntegerNumber(MIN_YEAR, MAX_YEAR),
    movieDuration: generateMovieDuration(),
    genres: genetateGenres(),
    comments: getRandomIntegerNumber(0, MAX_COMMENTS_COUNT),
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
