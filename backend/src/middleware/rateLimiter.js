import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';

const apiLimiter = rateLimit({

  windowMs: process.env.RATE_LIMIT_WINDOW * 1000, // seconds
  max: process.env.RATE_LIMIT_MAX, 
    message: {
    status: httpStatus.TOO_MANY_REQUESTS,
    message: 'Too many attempt, please try again later.'
    },

    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


export  { apiLimiter };