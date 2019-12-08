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

const MAX_RAITING = 9;
const MIN_RAITING = 0;

const MIN_HOURS_DURATION = 0;
const MAX_MINUTES_DURATION = 59;
const MIN_MINUTES_DURATION = 1;

const MAX_VALUE = 3;

const MIN_YEAR = 1950;
const MAX_YEAR = 1950;

const MAX_COMMENTS_COUNT = 10;

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

const USER_STATUSES = {
  '0': ``,
  '1': `Novice`,
  '11': `Fan`,
  '21': `Movie Buff`
};

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

const COMMENTS = [
  {text: `Booooooooooring`, name: `John Doe`, date: `2 days ago`, emoji: `sleeping`},
  {text: `Very very old. Meh`, name: `Eric Roth`, date: `today`, emoji: `puke`},
  {text: `Almost two hours? Seriously?`, name: `Tim Macoveev`, date: `2019/12/31 23:59`, emoji: `angry`},
  {text: `Interesting setting and a good cast`, name: `Billy Wilder`, date: `3 days ago`, emoji: `smile`}
];

const INITIAL_DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export {MAX_AGE_RATING, MAX_COMMENTS_COUNT, MIN_YEAR, MAX_YEAR, MAX_VALUE, MIN_HOURS_DURATION, MAX_MINUTES_DURATION, MIN_MINUTES_DURATION, MAX_RAITING, MIN_RAITING, COMMENTS, COUTRIES, DIRECTORS, ACTORS, WRITERS, FILM_NAMES, POSTERS, CARDS_COUNT, USER_STATUSES, INITIAL_FILTERS_STATE, TOTAL_FILM_COUNT, RATES_CARDS_COUNT, INITIAL_DESCRIPTION_TEXT, GENRES};
