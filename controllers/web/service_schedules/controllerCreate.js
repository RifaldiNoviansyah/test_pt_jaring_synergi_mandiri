// model
const { service_schedules: serviceScheduleModels } = require('@models')
// helpers
const { internalServerError, success, notFound } = require('@helpers/errorResponse')
const validateInputBodyServiceSchedule = require('@helpers/validate_input_body/service_schedules/validateInputBodyServiceSchedule')

module.exports = {
  create: async (req, res) => {
    const dealerId = req.id
    const linkApi = '/api/web/service_schedule -create-'
    try {
      const { scheduleDate, quota } = req.body
      const hourArr = [09,10,11,12,13,14,15,16]
      const scheduleDateIsoString = new Date(scheduleDate).toISOString()
      const scheduleDateHour = new Date(scheduleDateIsoString).getHours()
      const found = hourArr.find(element => element === scheduleDateHour);

      if (found === undefined) {
        return notFound(res, 'Jam Service Scehdule Hanya Bisa di 09,10,11,12,13,14,15,16', scheduleDate, linkApi, dealerId)
      }
      
      const dataError = await validateInputBodyServiceSchedule.validateInputBodyServiceSchedule(res, req.body, linkApi, dealerId)
      if (dataError === undefined) {
        const serviceStatusData = await serviceScheduleModels.create({
          schedule_date: new Date(scheduleDate).toISOString(),
          quota,
          del_status: false,
          created_at: new Date(),
          updated_at: new Date()
        })
        return success(res, 'Data Service Schedule Berhasil Dibuat', serviceStatusData, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
