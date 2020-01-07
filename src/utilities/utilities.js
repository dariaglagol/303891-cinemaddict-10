const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getPlural = (count, one, more) => {
  return count > 1 || count === 0 ? more : one;
};

const generateRandomArrayPiece = (maxValue, array) => {
  const pieceLength = getRandomIntegerNumber(1, maxValue);
  const startPiece = getRandomIntegerNumber(1, array.length - pieceLength);
  return array.slice(startPiece, startPiece + pieceLength);
};

const setCardClickEventListeners = (clickableItems, card, handle) => {
  clickableItems.forEach((item) => {
    const clickableItem = card.getElement().querySelector(item);
    clickableItem.addEventListener(`click`, handle);
  });
};

const getFilmDuration = (movieDuration) => {
  const hours = movieDuration / 60 ^ 0;
  if (hours) {
    let minutes = movieDuration % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h ${minutes}m`;
  } else {
    return `${movieDuration}m`;
  }
};

export {setCardClickEventListeners, getFilmDuration, generateRandomArrayPiece, getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean, getPlural};
