// model
const { 
    service_bookings: serviceBookingModels,
    service_schedules: serviceSchedulesModels,
    service_statuses: serviceStatusModels
} = require('@models')
  // helpers
const { internalServerError, notFound } = require('@helpers/errorResponse')

module.exports = {
  queryGetOneServiceBooking: async (linkApi, dealerId, serviceBookingId, res) => {
    try {
      const serviceBookingData = await serviceBookingModels.findOne(
        {
          where: { 
                id: serviceBookingId,
                del_status: false
            },
        include:[
            {
                model: serviceSchedulesModels,
                as: "serviceSchedules"
            },
            {
                model: serviceStatusModels,
                as: "serviceStatuses"
            }
          ]
        }
      )
      if (!serviceBookingData) {
        return notFound(res, 'Data Service Booking Tidak Ditemukan', serviceBookingId, linkApi, dealerId)
      } else {
        return serviceBookingData
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
  