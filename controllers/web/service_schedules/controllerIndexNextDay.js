// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetAllServiceScheduleNextDays } = require('@query/service_schedules/findAllNextDay')

module.exports = {
  index: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/global/service_schedule -index next day-'
    try {
      const ServiceScheduleNextDayDatas = await queryGetAllServiceScheduleNextDays(linkApi, dealerId, res)
      if (ServiceScheduleNextDayDatas.length > 0) {
        const result = ServiceScheduleNextDayDatas.map((ServiceScheduleNextDayData) => ({
          id: ServiceScheduleNextDayData.id,
          scheduleDate: ServiceScheduleNextDayData.schedule_date,
          quota: ServiceScheduleNextDayData.quota,
          delStatus: ServiceScheduleNextDayData.del_status
        }))
        return success(res, 'Menampilkan Data Service schedule Berhasil',result, linkApi, dealerId)
      } else {
        return success(res, 'Belum Ada Data Service schedule', '0', linkApi, dealerId, 0)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
