// model
const { service_schedules: serviceSchedulesModels } = require('@models')
  // helpers
const { internalServerError, notFound } = require('@helpers/errorResponse')
// library
const { Op } = require("sequelize");

module.exports = {
  queryGetOneServiceScheduleNextDay: async (linkApi, dealerId, serviceScheduleId, res) => {
    try {
      const day = new Date()
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);

      const serviceScheduleData = await serviceSchedulesModels.findOne(
        {
          where: { 
            id: serviceScheduleId,
            del_status: false,
            quota: { 
              [Op.not] : 0 
            },
            schedule_date: {
              [Op.gte]: nextDay
            },
          },
        }
      )
      if (!serviceScheduleData) {
        return notFound(res, 'Data Service Schedule Tidak Tersedia', serviceScheduleId, linkApi, dealerId)
      } else {
        return serviceScheduleData
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  