// model
const { service_schedules: serviceSchedulesModels } = require('@models')
  // helpers
const { internalServerError, notFound } = require('@helpers/errorResponse')

module.exports = {
  queryGetOneServiceSchedule: async (linkApi, dealerId, serviceScheduleId, res) => {
    try {
      const serviceScheduleData = await serviceSchedulesModels.findOne(
        {
          where: { del_status: false, id: serviceScheduleId },
        }
      )
      if (!serviceScheduleData) {
        return notFound(res, 'Data Service Schedule Tidak Ditemukan', serviceScheduleId, linkApi, dealerId)
      } else {
        return serviceScheduleData
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  