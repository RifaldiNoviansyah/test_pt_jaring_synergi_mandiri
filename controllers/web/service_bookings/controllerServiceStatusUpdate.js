// helpers
const { internalServerError, success, notFound } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceBooking } = require('@query/service_bookings/findOne')
const { queryGetOneServiceStatus } = require('@query/service_statuses/findOne')
const { queryGetOneServiceSchedule } = require('@query/service_schedules/findOne')

module.exports = {
  update: async (req, res) => {
    const dealerId = req.id
    const serviceBookingId = req.params.serviceBookingId
    const serviceStatusId = req.params.serviceStatusId
    const linkApi = `/api/web/service_booking/${serviceBookingId}/status_service/${serviceStatusId} -update-`
    try {
      const serviceBookingData = await queryGetOneServiceBooking(linkApi, dealerId, serviceBookingId, res)
      if(serviceBookingData !== undefined){
        const serviceStatusData = await queryGetOneServiceStatus(linkApi, dealerId, serviceStatusId, res)
         if(serviceStatusData !== undefined){
          if(serviceStatusData.name === "konfirmasi batal"){
            const serviceScheduleData = await queryGetOneServiceSchedule(linkApi, dealerId, serviceBookingData.service_schedule_id, res)
                serviceScheduleData.quota +=1
                serviceScheduleData.updated_at = new Date()
                await serviceScheduleData.save()
            }
          
          const dataScheduleBookindDate = new Date(serviceBookingData.serviceSchedules.schedule_date).getDate()
          const dateNow = new Date().getDate()

          if(dataScheduleBookindDate !== dateNow && serviceStatusData.name === "datang"){
             return notFound(res, 'Edit Ke Status ke Datang Hanya Bisa Di Ubah Di Hari H', serviceStatusData.name, linkApi, dealerId)
          }else{
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
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
