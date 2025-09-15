export const ENV = {
  API_BASE: import.meta.env.VITE_SHEETS_API_BASE as string,
};

if (!ENV.API_BASE) {
  // Fail fast in dev
  // eslint-disable-next-line no-console
  console.warn("VITE_SHEETS_API_BASE is not defined. Set it in .env");
}
