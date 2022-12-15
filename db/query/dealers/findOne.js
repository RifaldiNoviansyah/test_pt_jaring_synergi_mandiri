// model
const { 
    dealers: dealerModels,
} = require('@models')
  // helpers
const { internalServerError, notFound } = require('@helpers/errorResponse')

module.exports = {
  queryGetOneDealer: async (linkApi, dealerId, res) => {
    try {
      const serviceDealerData = await dealerModels.findOne(
        {
          where: { 
                id: dealerId,
                del_status: false
            },
        }
      )
      if (!serviceDealerData) {
        return notFound(res, 'Data Service Dealer Tidak Ditemukan', dealerId, linkApi, dealerId)
      } else {
        return serviceDealerData
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  