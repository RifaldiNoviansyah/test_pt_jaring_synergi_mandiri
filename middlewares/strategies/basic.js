const passport = require("passport");
const env = require("dotenv").config();
const { BasicStrategy } = require("passport-http");


passport.use("basic", new BasicStrategy(async (clientId, clientSecret, done) => {
  try {
    const checkId = clientId === process.env.CLIENT_ID;
    const checkSecret = clientSecret === process.env.CLIENT_SECRET;
    if (!checkId || !checkSecret) return done(null, false);

    return done(null, true);
  } catch (err) {
    console.error(err);
    done(err);
  }
}));
