// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetAllServiceSchedules } = require('@query/service_schedules/findAll')

module.exports = {
  index: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/service_schedule -index-'
    try {
      const ServiceScheduleDatas = await queryGetAllServiceSchedules(linkApi, dealerId, res)
      if (ServiceScheduleDatas.length > 0) {
        const result = ServiceScheduleDatas.map((ServiceScheduleNextDayData) => ({
          id: ServiceScheduleNextDayData.id,
          scheduleDate: ServiceScheduleNextDayData.schedule_date,
          quota: ServiceScheduleNextDayData.quota,
          delStatus: ServiceScheduleNextDayData.del_status
        }))
        return success(res, 'Menampilkan Semua Data Service schedule Berhasil',result, linkApi, dealerId)
      } else {
        return success(res, 'Belum Ada Data Service schedule', '0', linkApi, dealerId, 0)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
