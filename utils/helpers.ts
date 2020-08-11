
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

export const removeSymbolsAndDigits = (string: string) => {
  return string.replace(/['`~!@#$%^&*()_|+-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
};

export const timeSince = (date: number) => {
  const now = new Date().getTime();
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const uppercaseWords = (string: string) => {
  return string.split(' ').reduce((acc, cur, i, arr) => {
    let word = cur.toLowerCase();
    return acc + (i ? ' ' : '') + word.charAt(0).toUpperCase() + word.slice(1);
  }, '');
};

export const normalizeNameInput = (string: string) => {
  return uppercaseWords(removeSymbolsAndDigits(string));
};

export const transformObjectToFormData = (obj: any) : null | FormData => {
  if (obj !== Object(obj)) return null;
  const data = new FormData();
  Object.keys(obj).forEach(key => {
    data.append(key, obj[key]);
  });
  return data;
};
