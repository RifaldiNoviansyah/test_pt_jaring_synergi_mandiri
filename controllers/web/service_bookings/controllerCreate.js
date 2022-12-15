// model
const { service_bookings: serviceBookingModels } = require('@models')
// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceBooking = require('@helpers/validate_input_body/service_bookings/validateInputBodyServiceBooking')
// query
const { queryGetOneServiceScheduleNextDay } = require('@query/service_schedules/findOneNextDay')

module.exports = {
  create: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/service_status -create-'
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
      const dataError = await validateInputBodyServiceBooking.validateInputBodyServiceBooking(res, req.body, linkApi, dealerId)
      if (dataError === undefined) {
        const serviceScheduleData = await queryGetOneServiceScheduleNextDay(linkApi, dealerId, serviceScheduleId, res)
        if(serviceScheduleData !== undefined){
          serviceScheduleData.quota -= 1
          serviceScheduleData.updated_at = new Date()
          await serviceScheduleData.save()

          const serviceBookingData = await serviceBookingModels.create({
            name,
            phone_no: phoneNo,
            vehicle_type: vehicleType,
            license_plate: licensePlate,
            vehicle_problem: vehicleProblem,
            service_schedule_id: serviceScheduleId,
            service_time: serviceTime,
            service_status_id: serviceStatusId,
            del_status: false,
            created_at: new Date(),
            updated_at: new Date()
          })
          return success(res, 'Data Service Booking Berhasil Dibuat', serviceBookingData, linkApi, dealerId)
        }
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
