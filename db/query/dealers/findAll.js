// model
const { 
    dealers: dealerModels
} = require('@models')
  // helpers
const { internalServerError } = require('@helpers/errorResponse')

module.exports = {
  queryGetAllDealers: async (linkApi, dealerId, res) => {
    try {
      const dealerDatas = await dealerModels.findAll(
        {
          where: { del_status: false },
        }
      )
      return dealerDatas
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  