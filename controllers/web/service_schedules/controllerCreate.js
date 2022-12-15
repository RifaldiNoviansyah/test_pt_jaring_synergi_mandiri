// model
const { service_schedules: serviceScheduleModels } = require('@models')
// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyServiceSchedule = require('@helpers/validate_input_body/service_schedules/validateInputBodyServiceSchedule')

module.exports = {
  create: async (req, res) => {
    const dealerId = req.id
    const linkApi = '/api/web/service_schedule -create-'
    try {
      const { scheduleDate, quota } = req.body
      const dataError = await validateInputBodyServiceSchedule.validateInputBodyServiceSchedule(res, req.body, linkApi, dealerId)
      if (dataError === undefined) {
        const serviceStatusData = await serviceScheduleModels.create({
          schedule_date: scheduleDate,
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
