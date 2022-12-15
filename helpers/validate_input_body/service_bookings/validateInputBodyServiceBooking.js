// helpers
const { badInput } = require('@helpers/errorResponse')

module.exports = {
  validateInputBodyServiceBooking: async (res, body, linkApi, dealerId) => {
    if (body.name === null || body.name.length === 0) return [false, badInput(res, 'Name Tidak boleh kosong', body.name, linkApi, dealerId)]
    if (body.phoneNo === null || body.phoneNo.length === 0) return [false, badInput(res, 'Nomor Telepon Tidak boleh kosong', body.phoneNo, linkApi, dealerId)]
    if (body.vehicleType === null || body.vehicleType.length === 0) return [false, badInput(res, ' Jenis Kendaraan boleh kosong', body.vehicleType, linkApi, dealerId)]
    if (body.licensePlate === null || body.licensePlate.length === 0) return [false, badInput(res, 'Pelat Nomer Tidak boleh kosong', body.licensePlate, linkApi, dealerId)]
    if (body.vehicleProblem === null || body.vehicleProblem.length === 0) return [false, badInput(res, 'Masalah Kendaran Tidak boleh kosong', body.vehicleProblem, linkApi, dealerId)]
    if (body.serviceScheduleId === null || body.serviceScheduleId.length === 0) return [false, badInput(res, 'Jadwal Layanan Tidak boleh kosong', body.serviceScheduleId, linkApi, dealerId)]
    if (body.serviceTime === null || body.serviceTime.length === 0) return [false, badInput(res, 'Jam Layanan Tidak boleh kosong', body.serviceTime, linkApi, dealerId)]
    if (body.serviceStatusId === null || body.serviceStatusId.length === 0) return [false, badInput(res, 'Status Service Layanan Tidak boleh kosong', body.serviceStatusId, linkApi, dealerId)]
  }
}
