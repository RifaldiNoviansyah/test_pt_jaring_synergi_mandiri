const passport = require("passport");
const { Strategy } = require("passport-http-bearer");

const {
  access_tokens: accessTokenModels,
  dealers: dealerModels,
} = require("@models");
const jwt = require("jsonwebtoken");

passport.use("bearer", new Strategy(async (token, done) => {
  try {
    const jwtAccess = jwt.verify(token, process.env.JWT);
    const getAccessTokenData = await accessTokenModels.findOne({
      where: {
        del_status: false,
        access_token: token,
        dealer_id: jwtAccess.data.id,
      },
    });
    if (!getAccessTokenData) throw new Error("Invalid Token");

    const dealerData = await dealerModels.findOne({ where: { id: jwtAccess.data.id, del_status: false } });

    if (!dealerData) return done(null, false);
    return done(null, dealerData, { scope: "*" });
  } catch (error) {
    console.log("#Bearer Auth Error", error);
    if (error.message === "JsonWebTokenError") return done("Token Error");
    return done(error.message);
  }
}));
