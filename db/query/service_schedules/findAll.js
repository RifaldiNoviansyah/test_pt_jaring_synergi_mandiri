// model
const { service_schedules: serviceSchedulesModels } = require('@models')
  // helpers
const { internalServerError } = require('@helpers/errorResponse')

module.exports = {
  queryGetAllServiceSchedules: async (linkApi, dealerId, res) => {
    try {
      const serviceScheludeDatas = await serviceSchedulesModels.findAll(
        {
          where: { del_status: false },
        }
      )
      return serviceScheludeDatas
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  