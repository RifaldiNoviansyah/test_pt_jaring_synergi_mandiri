// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceBooking } = require('@query/service_bookings/findOne')
// library
const moment = require("moment");

module.exports = {
  show: async (req, res) => {
    const dealerId = req.id
    const serviceBookingId = req.params.serviceBookingId
    const linkApi = `/api/web/service_status/${serviceBookingId} -show-`
    try {
      const serviceBookingData = await queryGetOneServiceBooking(linkApi, dealerId, serviceBookingId, res)
      if(serviceBookingData !== undefined){
        const result = {
          id: serviceBookingData.id,
          name: serviceBookingData.name,
          phoneNo: serviceBookingData.phone_no,
          vehicleType: serviceBookingData.vehicle_type,
          licensePlate: serviceBookingData.license_plate,
          vehicleProblem: serviceBookingData.vehicle_problem,
          serviceScheduleId: serviceBookingData.service_schedule_id,
          serviceSchedulDate: serviceBookingData.serviceSchedules.schedule_date,
          serviceTime: serviceBookingData.service_time,
          serviceStatusId: serviceBookingData.service_status_id,
          serviceStatusName: serviceBookingData.serviceStatuses.name,
          delStatus: serviceBookingData.del_status
        }
        return success(res, 'Menampilkan Detail Service Booking Berhasil', result, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
