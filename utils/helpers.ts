import { FormattedImage } from "types";

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const isObject = function (o: object) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== "function";
};

export const keysToCamel = function (o: object): any {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
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
  return string.replace(/['`~!@#$%^&*()_|+-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};

const pluralize = (val: number, word: string, plural: string = word + "s") => {
  const _pluralize = (num: number, word: string, plural = word + "s") =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === "object")
    return (num: number, word: string) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};

export const timeSince = (date: number) => {
  const now = new Date().getTime();
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} ${pluralize(interval, "year")}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} ${pluralize(interval, "month")}`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ${pluralize(interval, "day")}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} ${pluralize(interval, "hour")}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} ${pluralize(interval, "minute")}`;
  }
  return seconds <= 0
    ? "just now"
    : `${Math.floor(seconds)} ${pluralize(seconds, "second")}`;
};

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const uppercaseWords = (string: string) => {
  return string.split(" ").reduce((acc, cur, i, arr) => {
    let word = cur.toLowerCase();
    return acc + (i ? " " : "") + word.charAt(0).toUpperCase() + word.slice(1);
  }, "");
};

export const normalizeNameInput = (string: string) => {
  return uppercaseWords(removeSymbolsAndDigits(string));
};

export const transformObjectToFormData = (obj: any): null | FormData => {
  if (obj !== Object(obj)) return null;
  const data = new FormData();
  Object.keys(obj).forEach((key) => {
    data.append(key, obj[key]);
  });
  return data;
};

export const cloudinaryUrl = (publicId: string): FormattedImage => {
  const base = "https://res.cloudinary.com/dmdde6mop/image/upload";
  return {
    original: base + `/f_auto/${publicId}`,
    normal: base + `/q_70,f_auto/${publicId}`,
    static: base + `/q_70/${publicId}.jpeg`,
    low: base + `/q_1,f_jpeg/${publicId}`,
  };
};

export const formateDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    hour12: false,
    month: "short",
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
  });
};
