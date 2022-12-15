// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneDealer } = require('@query/dealers/findOne')
// library
const moment = require("moment");

module.exports = {
  show: async (req, res) => {
    const dealerId = req.params.dealerId
    const linkApi = `/api/web/delear/${dealerId} -show-`
    try {
      const dealerData = await queryGetOneDealer(linkApi, dealerId, res)
      if(dealerData !== undefined){
        const result = {
            id: dealerData.id,
            name: dealerData.name,
            username: dealerData.username,
            address: dealerData.address,
            delStatus: dealerData.del_status
        }
        return success(res, 'Menampilkan Detail Dealer Berhasil', result, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
