// helpers
const { badInput } = require('@helpers/errorResponse')

module.exports = {
  validateInputBodyServiceSchedule: async (res, body, linkApi, dealerId) => {
    if (body.scheduleDate === null || body.scheduleDate.length === 0) return [false, badInput(res, 'Tanggal Tidak boleh kosong', body.scheduleDate, linkApi, dealerId)]
    if (body.quota === null || body.quota.length === 0) return [false, badInput(res, 'Kuota Tidak boleh kosong', body.quota, linkApi, dealerId)]
  }
}
