// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceSchedule } = require('@query/service_schedules/findOne')
// library
const moment = require("moment");

module.exports = {
  show: async (req, res) => {
    const dealerId = req.id
    const serviceScheduleId = req.params.serviceScheduleId
    const linkApi = `/api/web/service_status/${serviceScheduleId} -show-`
    try {
      const serviceScheduleData = await queryGetOneServiceSchedule(linkApi, dealerId, serviceScheduleId, res)
      if(serviceScheduleData !== undefined){
        const result = {
          id: serviceScheduleData.id,
          scheduleDate: serviceScheduleData.schedule_date,
          quota: serviceScheduleData.quota,
          delStatus: serviceScheduleData.del_status
        }
        return success(res, 'Menampilkan Detail Service Schedule Berhasil', result, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
