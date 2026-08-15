import dotenv from 'dotenv';

dotenv.config();

const defaultBaseUrl = 'http://127.0.0.1:4173';

export const environment = {
  baseURL: process.env.BASE_URL ?? defaultBaseUrl,
  isCI: process.env.CI === 'true',
  locale: 'en-US',
  timezoneId: 'UTC',
} as const;
