import {COMMENTS_EMODJIES, COMMENTS_TIME_RANGE, COMMENTS_AUTHORS, COMMENTS_TEXTS} from '../mocks/constants';
import {getRandomArrayItem, getRandomIntegerNumber, getRandomBoolean} from '../utilities/utilities';

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffMinutesValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`MINUTES_RANGE`]);
  const diffHoursValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`HOURS_RANGE`]);
  const diffDateValue = sign * getRandomIntegerNumber(0, COMMENTS_TIME_RANGE[`DATE_RANGE`]);

  targetDate.setMinutes(targetDate.getMinutes() + diffMinutesValue);
  targetDate.setHours(targetDate.getHours() + diffHoursValue);
  targetDate.setDate(targetDate.getDate() + diffDateValue);

  return targetDate;
};

const generateComment = () => {
  return {
    text: getRandomArrayItem(COMMENTS_TEXTS),
    author: getRandomArrayItem(COMMENTS_AUTHORS),
    emoji: getRandomArrayItem(COMMENTS_EMODJIES),
    date: getRandomDate()
  };
};

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
