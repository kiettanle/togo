require('dotenv').config();

const commonEnv = {
  projectName: process.env.PROJECT_NAME || 'tradein',
  environment: process.env.NODE_ENV,
  timeZone: 'Asia/Bangkok',

  debug: process.env.DEBUG || true,
  applicationMode: process.env.APPLICATION_MODE || 'api',

  swagger: {
    path: '/_swagger',
  },

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
  },

  jwt: {
    expiration: 24 * 60 * 60 * 7, // 7 days
    rememberMe: 24 * 60 * 60 * 30, // 30 days
    issuer: process.env.HOST || 'localhost',
    audience: 'TodoApp',
    secretKey: process.env.JWT_SECRET_KEY || '2a4Xj9vQjfxV3rw2Usi2qMKEiMlOIjN6',
    refreshTokenTTL: 3600 * 24 * 90, // 90 days
    refreshTokenKeyPrefix: 'refresh_token',
  },

  /**
   * rate limit (200 per 10 sec)
   */
  rateLimit: {
    type: 'Memory',
    points: 200, // number of count which you can consume during the period
    duration: 10, // time when refreshing points
    pointsConsumed: 1, // point per consuming
    keyPrefix: 'rate_limit',
  },
};

export const environment = (() => {
  return commonEnv;
})();
