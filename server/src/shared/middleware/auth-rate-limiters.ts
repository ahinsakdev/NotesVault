import { rateLimit } from "express-rate-limit";

const MINUTE_IN_MILLISECONDS = 60 * 1000;

type AuthRateLimiterOptions = {
  limit: number;
  windowMinutes: number;
};

function createAuthRateLimiter({
  limit,
  windowMinutes,
}: AuthRateLimiterOptions) {
  return rateLimit({
    windowMs: windowMinutes * MINUTE_IN_MILLISECONDS,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
        },
      });
    },
  });
}

export const signupRateLimiter = createAuthRateLimiter({
  limit: 5,
  windowMinutes: 60,
});

export const loginRateLimiter = createAuthRateLimiter({
  limit: 10,
  windowMinutes: 15,
});

export const forgotPasswordRateLimiter = createAuthRateLimiter({
  limit: 5,
  windowMinutes: 15,
});

export const resetPasswordRateLimiter = createAuthRateLimiter({
  limit: 10,
  windowMinutes: 15,
});

export const changePasswordRateLimiter = createAuthRateLimiter({
  limit: 10,
  windowMinutes: 15,
});
