// model
const { service_statuses: serviceStatusModels } = require('@models')
// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceStatus = require('@helpers/validate_input_body/service_statuses/validateInputBodyServiceStatus')

module.exports = {
  create: async (req, res) => {
    const dealerId = req.id
    const linkApi = '/api/web/service_status -create-'
    try {
      const { name } = req.body
      const dataError = await validateInputBodyServiceStatus.validateInputBodyServiceStatus(res, req.body, linkApi, dealerId)
      if (dataError === undefined) {
        const serviceStatusData = await serviceStatusModels.create({
          name,
          del_status: false,
          created_at: new Date(),
          updated_at: new Date()
        })
        return success(res, 'Data Service Status Berhasil Dibuat', serviceStatusData, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
