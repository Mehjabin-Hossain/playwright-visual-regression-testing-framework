export const logger = {
  info(message: string): void {
    console.log(`[visual-framework] ${message}`);
  },
  warn(message: string): void {
    console.warn(`[visual-framework] ${message}`);
  },
  error(message: string): void {
    console.error(`[visual-framework] ${message}`);
  },
} as const;
