// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetOneServiceSchedule } = require('@query/service_schedules/findOne')

module.exports = {
  delete: async (req, res) => {
    const dealerId = req.id
    const serviceScheduleId = req.params.serviceScheduleId
    const linkApi = `/api/web/service_schedule/${serviceScheduleId} -delete-`
    try {
      const serviceStatusData = await queryGetOneServiceSchedule(linkApi, dealerId, serviceScheduleId, res)
      if(serviceStatusData !== undefined){
          serviceStatusData.del_status = true
          serviceStatusData.updated_at = new Date()
          await serviceStatusData.save()

          const result = {
            id: serviceStatusData.id,
            scheduleDate: serviceStatusData.schedule_date,
            quota: serviceStatusData.quota,
            delStatus: serviceStatusData.del_status
          }
          return success(res, 'Hapus Service Schedule Berhasil', result, linkApi, dealerId)
        }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
