// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
// query
const { queryGetAllBookingSchedules } = require('@query/service_bookings/findAll')

module.exports = {
  index: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/service_booking -index-'
    try {
      const { startDate, startMonth, startYear, endDate, endMonth, endYear } = req.query;
      const currentDate = new Date(Date.now());
      const thisDate = currentDate.getDate();
      const thisMonthIndex = currentDate.getMonth();
      const thisYear = currentDate.getFullYear();
      const date1 = startDate && startMonth && startYear
        ? new Date(startYear, parseInt(startMonth, 10) - 1, startDate, 0, 0, 0)
        : new Date(thisYear, thisMonthIndex, thisDate, 0, 0, 0);
      const date2 = endDate && endMonth && endYear
        ? new Date(endYear, parseInt(endMonth, 10) - 1, endDate, 23, 59, 59)
        : new Date(thisYear, thisMonthIndex, thisDate, 23, 59, 59);

      const serviceBookingDatas = await queryGetAllBookingSchedules(linkApi, dealerId, date1, date2, res)
      if (serviceBookingDatas.length > 0) {
        const result = serviceBookingDatas.map((serviceBookingData) => ({
          id: serviceBookingData.id,
          name: serviceBookingData.name,
          phoneNo: serviceBookingData.phone_no,
          vehicleType: serviceBookingData.vehicle_type,
          licensePlate: serviceBookingData.license_plate,
          vehicleProblem: serviceBookingData.vehicle_problem,
          serviceScheduleId: serviceBookingData.service_schedule_id,
          serviceSchedulDate: serviceBookingData.serviceSchedules.schedule_date,
          serviceTime: serviceBookingData.service_time,
          serviceStatusId: serviceBookingData.service_status_id,
          serviceStatusName: serviceBookingData.serviceStatuses.name,
          delStatus: serviceBookingData.del_status
        }))
        return success(res, 'Menampilkan Semua Data Service Booking Berhasil',result, linkApi, dealerId)
      } else {
        return success(res, 'Belum Ada Data Service Booking', '0', linkApi, dealerId, 0)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
