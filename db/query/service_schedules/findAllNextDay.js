// model
const { service_schedules: serviceSchedulesModels } = require('@models')
  // helpers
const { internalServerError } = require('@helpers/errorResponse')
// library
const { Op } = require("sequelize");

module.exports = {
  queryGetAllServiceScheduleNextDays: async (linkApi, dealerId, res) => {
    try {
      const day = new Date()
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);

      const serviceScheludeNextDayDatas = await serviceSchedulesModels.findAll(
        {
          where: { 
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
      return serviceScheludeNextDayDatas
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  