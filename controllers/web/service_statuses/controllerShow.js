// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceStatus } = require('@query/service_statuses/findOne')

module.exports = {
  show: async (req, res) => {
    const dealerId = null
    const serviceStatusId = req.params.serviceStatusId
    const linkApi = `/api/web/service_status/${serviceStatusId} -show-`
    try {
      const ServiceStatusData = await queryGetOneServiceStatus(linkApi, dealerId, serviceStatusId, res)
      if(ServiceStatusData !== undefined){
        const result = {
          id: ServiceStatusData.id,
          name: ServiceStatusData.name,
          delStatus: ServiceStatusData.del_status
        }
        return success(res, 'Menampilkan Detail Service Status Berhasil', result, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
