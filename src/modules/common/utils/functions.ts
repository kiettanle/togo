import { generatePaginationLinks, safeKey } from './';
import { environment } from '@env/environment';
import { Request } from 'express';
import { formatDate } from './date-time.helper';

/**
 * Pick object with none empty value
 * @param obj - The object you want to filter
 * @param isStrict - Exclude string of empty
 */
export const pickNotEmpty = (
  obj: Record<string, any> | string | number | boolean | Date,
  isStrict: boolean = false,
) => {
  const newObj = {};

  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    if (obj[safeKey(key)] && Array.isArray(obj[safeKey(key)])) {
      // isArray
      const arr = obj[safeKey(key)];

      newObj[safeKey(key)] = [];
      arr.forEach((d: string | number | boolean | Record<string, any>) => {
        newObj[safeKey(key)].push(pickNotEmpty(d, isStrict));
      });
    } else if (obj[safeKey(key)] && typeof obj[safeKey(key)] === 'object') {
      // isObject

      if (Object.prototype.toString.call(obj[safeKey(key)]) === '[object Date]') {
        newObj[safeKey(key)] = formatDate(obj[safeKey(key)], 'yyyy-MM-dd');
      } else {
        newObj[safeKey(key)] = pickNotEmpty(obj[safeKey(key)], isStrict);
      }
    } else if (isStrict && obj[safeKey(key)] === '') {
      // pass
    } else if (obj[safeKey(key)] !== undefined && obj[safeKey(key)] !== null) {
      newObj[safeKey(key)] = obj[safeKey(key)];
    }
  });

  return newObj;
};

export const generatePagination = (
  req: Request,
  path: string,
  page: number = 1,
  perPage: number = 25,
  total: number = 0,
  unread: number = 0,
) => {
  const baseUrl = `${environment.server.domainURL}/${path}`;
  const link: string = generatePaginationLinks(baseUrl, page, perPage, Math.ceil(total / perPage));

  if (link.length > 0) {
    req.res.set('Link', link);
  }

  req.res.set('x-total-count', `${total}`);
  req.res.set('x-unread', `${unread}`);
};
