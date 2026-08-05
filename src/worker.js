/**
 * The portfolio is a static Next.js export. Keep the Worker entry point
 * ESM-only so no Node/CommonJS module is evaluated at startup.
 */
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
