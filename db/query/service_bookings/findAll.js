// model
const { 
    service_bookings: serviceBookingModels,
    service_schedules: serviceSchedulesModels,
    service_statuses: serviceStatusModels
} = require('@models')
  // helpers
const { internalServerError } = require('@helpers/errorResponse')
const { Op } = require("sequelize");

module.exports = {
  queryGetAllBookingSchedules: async (linkApi, dealerId, date1, date2, res) => {
    try {
      const serviceBookingDatas = await serviceBookingModels.findAll(
        {
          where: { 
            del_status: false,
          },
          include:[
            {
                model: serviceSchedulesModels,
                as: "serviceSchedules",
                where: {
                  schedule_date: {
                    [Op.gte]: date1,
                    [Op.lte]: date2,
                  },
                }
            },
            {
                model: serviceStatusModels,
                as: "serviceStatuses"
            }
          ]
        }
      )
      return serviceBookingDatas
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  