const {
    dealers: dealerModels,
    access_tokens: accessToken,
  } = require("@models");
  
  const response = require("@helpers/response");
  const errorResponse = require("@helpers/errorResponse");
  
  module.exports = {
    logout: async (req, res) => {
      try {
        const { username } = req.body;
        const dealerData = await dealerModels.findOne({
          where: {
            del_status: false,
            username,
          },
        });
        if (!dealerData) return response(res, 401, "Dealer Telah Logout, Tolong log in Kembali", null);
  
        const dealerDataAccessToken = await accessToken.findOne({
          where: {
            del_status: false,
            dealer_id: dealerData.id,
          },
        });
        if (dealerDataAccessToken) {
          dealerDataAccessToken.access_token = null;
          dealerDataAccessToken.access_token_expired_at = null;
          dealerDataAccessToken.refresh_token = null;
          await dealerDataAccessToken.save();
        }
        dealerData.status_login = false;
        await dealerData.save();
  
        return response(res, 200, "Log Out Berhasil", dealerData);
      } catch (error) {
        console.log(error);
        return errorResponse.internalServerError(res, error.message);
      }
    },
  };
  