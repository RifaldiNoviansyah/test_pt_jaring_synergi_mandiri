const passport = require("passport");
const response = require("@helpers/response");

exports.basicAuth = () => async (req, res, next) => {
  try {
    await passport.authenticate("basic", { session: false }, async (err, client) => {
      if (!client || err) return res.status(401).json({ error: "Unauthorized", data: null });

      return next();
    })(req, res, next);
  } catch (error) {
    console.log(error);
    return response(res, 401, "Basic Auth Invalid", error.message);
  }
};

exports.accessTokenValid = () => async (req, res, next) => {
  try {
    await passport.authenticate("bearer", { session: false }, async (err, user) => {
      if (!user || err) return response(res, 401, `${err}, please re-login`, null);
      req.user = user;
      return next();
    })(req, res, next);
  } catch (error) {
    console.log(error);
    return response(res, 401, "Bearer token Invalid", error.message);
  }
};
