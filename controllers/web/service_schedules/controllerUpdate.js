// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceSchedule = require('@helpers/validate_input_body/service_schedules/validateInputBodyServiceSchedule')
// query
const { queryGetOneServiceSchedule } = require('@query/service_schedules/findOne')

module.exports = {
  update: async (req, res) => {
    const dealerId = req.id
    const serviceScheduleId = req.params.serviceScheduleId
    const linkApi = `/api/web/service_schedule/${serviceScheduleId} -update-`
    try {
      const { scheduleDate, quota } = req.body
      const hourArr = [09,10,11,12,13,14,15,16]
      const scheduleDateIsoString = new Date(scheduleDate).toISOString()
      const scheduleDateHour = new Date(scheduleDateIsoString).getHours()
      const found = hourArr.find(element => element === scheduleDateHour);

      if (found === undefined) {
        return notFound(res, 'Jam Service Scehdule Hanya Bisa di 09,10,11,12,13,14,15,16', scheduleDate, linkApi, dealerId)
      }

      const serviceScheduleData = await queryGetOneServiceSchedule(linkApi, dealerId, serviceScheduleId, res)
      if(serviceScheduleData !== undefined){
        const dataError = await validateInputBodyServiceSchedule.validateInputBodyServiceSchedule(res, req.body, linkApi, dealerId)
        if (dataError === undefined) {

          serviceScheduleData.schedule_date = scheduleDate
          serviceScheduleData.quota = quota
          serviceScheduleData.updated_at = new Date()
          await serviceScheduleData.save()

          const result = {
            id: serviceScheduleData.id,
            schedule_date: serviceScheduleData.scheduleDate,
            quota: serviceScheduleData.quota,
            delStatus: serviceScheduleData.del_status
          }
          return success(res, 'Ubah Service Schedule Berhasil', result, linkApi, dealerId)
        }
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
