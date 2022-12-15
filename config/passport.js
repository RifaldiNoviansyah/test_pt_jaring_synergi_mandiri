require("@middlewares/strategies/basic");
require("@middlewares/strategies/bearer");

const passport = require("passport");
const { dealers: dealerModels } = require("@models");

passport.serializeUser((dealers, done) => done(null, dealers.id));

passport.deserializeUser((id, done) => {
  try {
    dealerModels.findOne({ where: { id } }).then((dealers) => done(null, dealers));
  } catch (error) {
    done(error);
  }
});
