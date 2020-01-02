const FILM_NAMES = [
  `Lock, Stock and Two Smoking Barrels`,
  `The Hateful Eight`,
  `Pulp Fiction`,
  `Cloud Atlas`,
  `In Bruges`,
  `The Guard`,
  `The Favourite`,
  `Knives Out`,
  `Fantastic Beasts and Where to Find Them`,
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Catch Me If You Can`,
  `Darkest Hour`,
  `Three Billboards Outside Ebbing, Missouri`,
  `The Prestige`,
  `Ocean's Eleven`
];

const Rating = {
  MIN: 0,
  MAX: 9
};

const Duration = {
  MIN: 1,
  MAX: 250
};

const Year = {
  MIN: 1950,
  MAX: 2000
};

const TopFilmType = {
  RATING: `rating`,
  COMMENTS: `comments`
};

const MAX_VALUE = 3;

const MAX_AGE_RATING = 21;

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const INITIAL_FILTERS_STATE = {
  'all movies': null,
  'watchlist': 0,
  'history': 0,
  'favorites': 0
};

const CARDS_COUNT = 5;
const TOTAL_FILM_COUNT = 12;
const RATES_CARDS_COUNT = 2;

const GENRES = [
  `Action film`,
  `Western`,
  `Gangster movie`,
  `Detective`,
  `Drama`,
  `Historical film`,
  `Comedy`,
  `Melodrama`
];

const USER_STATUSES = new Map([
  [`0`, ``],
  [`1`, `Novice`],
  [`11`, `Fan`],
  [`21`, `Movie Buff`]
]);

const DIRECTORS = [
  `Sofia Coppola`,
  `Richard Linklater`,
  `Paul Thomas Anderson`,
  `Quentin Tarantino`,
  `David O. Russell`,
  `Christopher Nolan`,
  `Sam Mendes`,
  `David Andrew Leo Fincher`,
  `Martin Scorsese`,
  `Joel David Coen and Ethan Jesse Coen`
];

const ACTORS = [
  `Alan Rickman`,
  `Benedict Cumberbatch`,
  `Benicio del Toro`,
  `Vincent Cassel`,
  `Viggo Mortensen`,
  `James McAvoy`,
  `Jake Gyllenhaal`,
  `Daniel Day-Lewis`,
  `Jodie Foster`,
  `Kate Winslet`,
  `Monica Bellucci`,
  `Natalie Portman`
];

const WRITERS = [
  `Billy Wilder`,
  `Joel David Coen and Ethan Jesse Coen`,
  `Quentin Tarantino`,
  `Charlie Kaufman`,
  `Heywood "Woody" Allen`,
  `Eric Roth`,
  `James Cameron`,
  `Peter Jackson`,
  `Wes Anderson`,
  `Frank Darabont`
];

const COUTRIES = [
  `USA`,
  `Germany`,
  `Great Britain`,
  `France`,
  `Italy`,
  `Japan`,
  `Canada`,
  `Denmark`
];

const COMMENTS_TEXTS = [
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Interesting setting and a good cast`
];

const COMMENTS_AUTHORS = [
  `John Doe`,
  `Eric Roth`,
  `Tim Macoveev`,
  `Billy Wilder`
];

const COMMENTS_EMODJIES = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`
];

const COMMENTS_TIME_RANGE = {
  'MINUTES_RANGE': 59,
  'HOURS_RANGE': 4,
  'DATE_RANGE': 3
};

const COMMENTS_COUNT = 4;

const INITIAL_DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

const MAX_FILM_SCORE = 9;

const CLICKABLE_ITEMS = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

export {RenderPosition, TopFilmType, CLICKABLE_ITEMS, MAX_FILM_SCORE, MAX_AGE_RATING, COMMENTS_EMODJIES, COMMENTS_COUNT, COMMENTS_TIME_RANGE, COMMENTS_AUTHORS, COMMENTS_TEXTS, Year, MAX_VALUE, Duration, Rating, COUTRIES, DIRECTORS, ACTORS, WRITERS, FILM_NAMES, POSTERS, CARDS_COUNT, USER_STATUSES, INITIAL_FILTERS_STATE, TOTAL_FILM_COUNT, RATES_CARDS_COUNT, INITIAL_DESCRIPTION_TEXT, GENRES};
