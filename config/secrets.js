module.exports = {
  jwtSecret: process.env.JWT_SECRET || "keep it secret keep it safe",
  googleApiKey: process.env.GOOGLE_KEY || "fake google api key",
  environment: process.env.DB_ENV || process.env.NODE_ENV || "development"
};
