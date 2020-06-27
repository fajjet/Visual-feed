export const percentageToColor = (
  percentage: number,
  inversion: boolean,
  saturation: number = 100,
  lightness: number = 50,
  maxHue: number = 360,
  minHue: number = 110
) => {
  const hue = ((inversion ? 1 : 0) - percentage) * (maxHue - minHue) + minHue;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const isObject = function (o: object) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};

export const keysToCamel = function (o: object) : any {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k]);
      });

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }
  return o;
};
