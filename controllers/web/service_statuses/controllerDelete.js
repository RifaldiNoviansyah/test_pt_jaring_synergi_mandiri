// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceStatus } = require('@query/service_statuses/findOne')

module.exports = {
  delete: async (req, res) => {
    const dealerId = req.id
    const serviceStatusId = req.params.serviceStatusId
    const linkApi = `/api/web/service_status/${serviceStatusId} -delete-`
    try {
      const ServiceStatusData = await queryGetOneServiceStatus(linkApi, dealerId, serviceStatusId, res)
      if(ServiceStatusData !== undefined){
          ServiceStatusData.del_status = true
          ServiceStatusData.updated_at = new Date()
          await ServiceStatusData.save()

          const result = {
            id: ServiceStatusData.id,
            name: ServiceStatusData.name,
            delStatus: ServiceStatusData.del_status
          }
          return success(res, 'Hapus Service Status Berhasil', result, linkApi, dealerId)
        }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
