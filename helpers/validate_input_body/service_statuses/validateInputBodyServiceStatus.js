// helpers
const { badInput } = require('@helpers/errorResponse')

module.exports = {
    validateInputBodyServiceStatus: async (res, body, linkApi, dealerId) => {
    if (body.name === null || body.name.length === 0) return [false, badInput(res, 'Nama Tidak boleh kosong', body.name, linkApi, dealerId)]
  }
}
