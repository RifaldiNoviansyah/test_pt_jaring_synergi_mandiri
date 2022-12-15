// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceBooking } = require('@query/service_bookings/findOne')

module.exports = {
  delete: async (req, res) => {
    const dealerId = req.id
    const serviceBookingId = req.params.serviceBookingId
    const linkApi = `/api/web/service_booking/${serviceBookingId} -delete-`
    try {
      const serviceBookingData = await queryGetOneServiceBooking(linkApi, dealerId, serviceBookingId, res)
      if(serviceBookingData !== undefined){
          serviceBookingData.del_status = true
          serviceBookingData.updated_at = new Date()
          await serviceBookingData.save()

          const result = {
            id: serviceBookingData.id,
            name: serviceBookingData.name,
            phoneNo: serviceBookingData.phone_no,
            vehicleType: serviceBookingData.vehicle_type,
            licensePlate: serviceBookingData.license_plate,
            vehicleProblem: serviceBookingData.vehicle_problem,
            serviceScheduleId: serviceBookingData.service_schedule_id,
            serviceTime: serviceBookingData.service_time,
            serviceStatusId: serviceBookingData.service_status_id,
            delStatus: serviceBookingData.del_status
          }
          return success(res, 'Hapus Service Booking Berhasil', result, linkApi, dealerId)
        }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
