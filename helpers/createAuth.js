// model
const {
  dealers: dealerModels,
  access_tokens: accessToken,
} = require("@models")

// helper
const uuid = require("@helpers/uuidGenerator")

module.exports = {
  findOrCreateAuth: async (usage, refreshToken, accessTokenJWT, expiredDate, dealerId) => {
    try {
      let tokenData = null
      let isRefresh = null
      let isLoginUser = false
      switch (usage) {
        case "login":
          tokenData = await accessToken.findOne({ where: { dealer_id: dealerId } })
          break
        case "refresh":
          isRefresh = true
          refreshToken = uuid.uid(100)
          break
      }

      expiredDate = new Date(expiredDate)
      if (tokenData || isRefresh) {
        await accessToken.update({
          access_token: accessTokenJWT,
          access_token_expired_at: expiredDate,
          refresh_token: refreshToken,
          updated_at: new Date(),
        }, { where: { dealer_id: dealerId } })
      } else {
        await accessToken.create({
          dealer_id: dealerId,
          access_token: accessTokenJWT,
          access_token_expired_at: expiredDate,
          refresh_token: refreshToken,
          del_status: false,
          created_at: new Date(),
          updated_at: new Date(),
        })
      }

      const dealerData = await dealerModels.findOne({
        where: {
          id: dealerId,
          del_status: false,
        }
      })
      if (dealerData) {
        isLoginUser = true
      }
      const result = {
        access_token: accessTokenJWT,
        refresh_token: refreshToken,
        id: dealerId,
        username: dealerData.username,
        status_login: isLoginUser,
        access_token_expired_at: expiredDate,
      }
      return result
    } catch (error) {
      console.log("##Error findOrCreate function", error)
    }
  },
}
  