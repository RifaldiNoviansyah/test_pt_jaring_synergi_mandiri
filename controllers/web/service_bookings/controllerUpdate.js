// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceBooking = require('@helpers/validate_input_body/service_bookings/validateInputBodyServiceBooking')
// query
const { queryGetOneServiceBooking } = require('@query/service_bookings/findOne')


module.exports = {
  update: async (req, res) => {
    const dealerId = req.id
    const serviceBookingId = req.params.serviceBookingId
    const linkApi = `/api/web/service_booking/${serviceBookingId} -update-`
    try {
      const { 
        name, 
        phoneNo, 
        vehicleType, 
        licensePlate,
        vehicleProblem,
        serviceScheduleId,
        serviceTime,
        serviceStatusId
    } = req.body
      const serviceBookingData = await queryGetOneServiceBooking(linkApi, dealerId, serviceBookingId, res)
      if(serviceBookingData !== undefined){
        const dataError = await validateInputBodyServiceBooking.validateInputBodyServiceBooking(res, req.body, linkApi, dealerId)
        if (dataError === undefined) {

          serviceBookingData.name = name,
          serviceBookingData.phone_no = phoneNo,
          serviceBookingData.vehicle_type = vehicleType,
          serviceBookingData.license_plate = licensePlate,
          serviceBookingData.vehicle_problem = vehicleProblem,
          serviceBookingData.service_schedule_id = serviceScheduleId,
          serviceBookingData.service_time = serviceTime,
          serviceBookingData.service_status_id = serviceStatusId,
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
          return success(res, 'Ubah Service Booking Berhasil', result, linkApi, dealerId)
        }
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
