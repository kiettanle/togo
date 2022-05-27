import * as crypto from 'crypto';

export const createPasswordHash = (password: string): string => {
  const sha256 = crypto.createHash('sha256');

  return sha256.update(password, 'utf8').digest('hex');
};

export const checkSignInType = (username: string): 'email' | 'username' => {
  // eslint-disable-next-line security/detect-unsafe-regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(String(username).toLowerCase())) {
    return 'email';
  } else {
    return 'username';
  }
};

export const generateID = (count: number) => {
  const sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

// use safeKey = for easy tinkering in the console.
export const safeKey = (() => {
  // Safely allocate plainObject's inside iife
  // Since this function may get called very frequently -
  // I think it's important to have plainObject's
  // statically defined
  const obj = {};
  const arr = [];

  // ...if for some reason you ever use square brackets on these types...
  // const fun = function() {}
  // const bol = true;
  // const num = 0;
  // const str = '';
  return (key) => {
    // eslint-disable-next-line security/detect-object-injection
    if (obj[key] !== undefined || arr[key] !== undefined) {
      return `SAFE_${key}`;
    } else {
      return key;
    }
  };
})();

/**
 * Generate pagination link header
 * @param baseUrl - base url of the link
 * @param page - current page
 * @param totalPage - number of pages
 */
export function generatePaginationLinks(baseUrl: string, page: number, perPage: number, totalPage: number): string {
  const items = [];

  if (page > 1) {
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=1`,
      rel: 'first',
    });
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${page - 1}`,
      rel: 'prev',
    });
  }

  if (page < totalPage) {
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${parseInt(page.toString(), 10) + 1}`,
      rel: 'next',
    });
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${totalPage}`,
      rel: 'last',
    });
  }

  return items.map((item) => `<${item.link}>; rel="${item.rel}"`).join(', ');
}

export function generatePaginationLinksWithQuery(baseUrl: string, query: any, totalPage: number): string {
  const items = [];
  const { page = 1 as number, perPage = 10 as number } = query;

  delete query.page;
  delete query.perPage;

  const keys = Object.keys(query);
  const extraParams = [`perPage=${perPage}`];

  keys.forEach((key) => {
    extraParams.push(`${key}=${encodeURI(query[`${key}`])}`);
  });

  const params = extraParams.join('&');

  if (page > 1) {
    items.push({
      link: `${baseUrl}?${params}&page=1`,
      rel: 'first',
    });
    items.push({
      link: `${baseUrl}?${params}&page=${page - 1}`,
      rel: 'prev',
    });
  }

  if (page < totalPage) {
    items.push({
      link: `${baseUrl}?${params}&page=${(page as number) + 1}`,
      rel: 'next',
    });
    items.push({
      link: `${baseUrl}?${params}&page=${totalPage}`,
      rel: 'last',
    });
  }

  return items.map((item) => `<${item.link}>; rel="${item.rel}"`).join(', ');
}
