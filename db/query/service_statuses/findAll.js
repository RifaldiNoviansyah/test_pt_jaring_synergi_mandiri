// model
const { service_statuses: serviceStatusModels } = require('@models')
  // helpers
const { internalServerError } = require('@helpers/errorResponse')

module.exports = {
  queryGetAllServiceStatuses: async (linkApi, dealerId, res) => {
    try {
      const serviceStatusDatas = await serviceStatusModels.findAll(
        {
          where: { del_status: false },
        }
      )
      return serviceStatusDatas
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  