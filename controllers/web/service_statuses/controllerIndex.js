// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetAllServiceStatuses } = require('@query/service_statuses/findAll')

module.exports = {
  index: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/global/service_status -index-'
    try {
      const ServiceStatusDatas = await queryGetAllServiceStatuses(linkApi, dealerId, res)
      if (ServiceStatusDatas.length > 0) {
        const result = ServiceStatusDatas.map((ServiceStatusData) => ({
          id: ServiceStatusData.id,
          name: ServiceStatusData.name,
          delStatus: ServiceStatusData.del_status
        }))
        return success(res, 'Menampilkan Semua Data Service Status Berhasil',result, linkApi, dealerId)
      } else {
        return success(res, 'Belum Ada Data Service Status', '0', linkApi, dealerId, 0)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
