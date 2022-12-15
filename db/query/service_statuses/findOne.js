// model
const { service_statuses: serviceStatusModels } = require('@models')
  // helpers
const { internalServerError, notFound } = require('@helpers/errorResponse')

module.exports = {
  queryGetOneServiceStatus: async (linkApi, dealerId, serviceStatusId, res) => {
    try {
      const serviceStatusData = await serviceStatusModels.findOne(
        {
          where: { del_status: false, id: serviceStatusId },
        }
      )
      if (!serviceStatusData) {
        return notFound(res, 'Data Service Status Tidak Ditemukan', serviceStatusId, linkApi, dealerId)
      } else {
        return serviceStatusData
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  