// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetAllDealers } = require('@query/dealers/findAll')

module.exports = {
  index: async (req, res) => {
    const dealerId = req.id
    const linkApi = '/api/web/service_dealers -index-'
    try {
      const delaerDatas = await queryGetAllDealers(linkApi, dealerId, res)
      if (delaerDatas.length > 0) {
        const result = delaerDatas.map((dealerData) => ({
          id: dealerData.id,
          name: dealerData.name,
          username: dealerData.username,
          address: dealerData.address,
          delStatus: dealerData.del_status
        }))
        return success(res, 'Menampilkan Semua Data Dealer Berhasil',result, linkApi, dealerId)
      } else {
        return success(res, 'Belum Ada Data Dealer', '0', linkApi, dealerId, 0)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
