const PRODUCTION_PORTAL_ORIGIN = "https://portal.esmana-main.org";
const DEVELOP_PORTAL_ORIGIN = "http://localhost:3000";
const PRODUCTION_SERVICE_ORIGIN = "https://api.esmana-main.org";
const DEVELOP_SERVICE_ORIGIN = "http://localhost:8080";

export const PORTAL_ORIGIN =
  process.env.NODE_ENV === "development"
    ? DEVELOP_PORTAL_ORIGIN
    : PRODUCTION_PORTAL_ORIGIN;

export const SERVICE_ORIGIN =
  process.env.NODE_ENV === "development"
    ? DEVELOP_SERVICE_ORIGIN
    : PRODUCTION_SERVICE_ORIGIN;
