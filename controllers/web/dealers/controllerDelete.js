// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneDealer } = require('@query/dealers/findOne')


module.exports = {
  delete: async (req, res) => {
    const dealerId = req.params.dealerId
    const linkApi = `/api/web/dealer/${dealerId} -delete-`
    try {
      const dealerData = await queryGetOneDealer(linkApi, dealerId, res)
      if(dealerData !== undefined){
            dealerData.del_status = true
            dealerData.updated_at = new Date()
            await dealerData.save()

          const result = {
            id: dealerData.id,
            name: dealerData.name,
            username: dealerData.username,
            address: dealerData.address,
            delStatus: dealerData.del_status
          }
          return success(res, 'Delete Dealer Berhasil', result, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
