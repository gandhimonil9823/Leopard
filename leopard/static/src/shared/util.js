// eslint-disable-next-line import/prefer-default-export
import moment from 'moment';

export const isProd = process.env.NODE_ENV === 'production';

export const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const intToRGB = (i) => {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
};

export const getDummyFloorImageUrl = (text = 'Floor', width = 800, height = 800) =>
  ({
    link: `https://dummyimage.com/${width}x${height}/ffffff/7981fc.png&text=${text}`,
    dimensions: { width: 10, length: 10 }
  });

export const getColorByStringHash = str => intToRGB(hashCode(str) - 800000);

export const getWeekStartEndDates = date => [moment(date).startOf('week'), moment(date).endOf('week')];

