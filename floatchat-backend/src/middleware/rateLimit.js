const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests
  skipSuccessfulRequests: false,
  // Skip failed requests
  skipFailedRequests: false,
});

module.exports = limiter;
const constants = require('../utils/constants');

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || constants.RATE_LIMIT.DEFAULT_WINDOW_MS,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || constants.RATE_LIMIT.DEFAULT_MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    statusCode: constants.HTTP_STATUS.TOO_MANY_REQUESTS
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter (stricter for login attempts)
const authLimiter = rateLimit({
  windowMs: constants.RATE_LIMIT.AUTH_WINDOW_MS,
  max: constants.RATE_LIMIT.AUTH_MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many login attempts, please try again later.',
    statusCode: constants.HTTP_STATUS.TOO_MANY_REQUESTS
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Chat rate limiter (for AI interactions)
const chatLimiter = rateLimit({
  windowMs: constants.RATE_LIMIT.CHAT_WINDOW_MS,
  max: constants.RATE_LIMIT.CHAT_MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many chat requests, please slow down.',
    statusCode: constants.HTTP_STATUS.TOO_MANY_REQUESTS
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  general: generalLimiter,
  auth: authLimiter,
  chat: chatLimiter
};
