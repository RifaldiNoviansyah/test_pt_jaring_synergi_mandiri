// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceStatus = require('@helpers/validate_input_body/service_statuses/validateInputBodyServiceStatus')
// query
const { queryGetOneServiceStatus } = require('@query/service_statuses/findOne')

module.exports = {
  update: async (req, res) => {
    const dealerId = req.id
    const serviceStatusId = req.params.serviceStatusId
    const linkApi = `/api/web/service_status/${serviceStatusId} -update-`
    try {
      const { name } = req.body
      const ServiceStatusData = await queryGetOneServiceStatus(linkApi, dealerId, serviceStatusId, res)
      if(ServiceStatusData !== undefined){
        const dataError = await validateInputBodyServiceStatus.validateInputBodyServiceStatus(res, req.body, linkApi, dealerId)
        if (dataError === undefined) {

          ServiceStatusData.name = name
          ServiceStatusData.updated_at = new Date()
          await ServiceStatusData.save()

          const result = {
            id: ServiceStatusData.id,
            name: ServiceStatusData.name,
            delStatus: ServiceStatusData.del_status
          }
          return success(res, 'Ubah Service Status Berhasil', result, linkApi, dealerId)
        }
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
