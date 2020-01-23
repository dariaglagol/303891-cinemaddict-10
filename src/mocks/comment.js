import {COMMENTS_EMODJIES, COMMENTS_AUTHORS, COMMENTS_TEXTS} from '../mocks/constants';
import {getRandomArrayItem, getRandomDate} from '../utilities/utilities';

const generateComment = (id) => {
  return {
    text: getRandomArrayItem(COMMENTS_TEXTS),
    author: getRandomArrayItem(COMMENTS_AUTHORS),
    emoji: getRandomArrayItem(COMMENTS_EMODJIES),
    date: getRandomDate(),
    id
  };
};

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map((item, index) => generateComment(index));
};
