export const SESSION_DURATION = {
  default: "1d",
  remembered: "30d",
} as const;

export const SESSION_MAX_AGE = {
  default: 24 * 60 * 60 * 1000,
  remembered: 30 * 24 * 60 * 60 * 1000,
} as const;
