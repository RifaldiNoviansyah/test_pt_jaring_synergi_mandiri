// helpers
const { badInput } = require('@helpers/errorResponse')

module.exports = {
  validateInputBodyDealer: async (res, body, linkApi, dealerId) => {
    if (body.name === null || body.name.length === 0) return [false, badInput(res, 'Name Tidak boleh kosong', body.name, linkApi, dealerId)]
    if (body.username === null || body.username.length === 0) return [false, badInput(res, 'Username Tidak boleh kosong', body.username, linkApi, dealerId)]
    if (body.password === null || body.password.length === 0) return [false, badInput(res, 'Password boleh kosong', body.password, linkApi, dealerId)]
    if (body.address === null || body.address.length === 0) return [false, badInput(res, 'Address Tidak boleh kosong', body.address, linkApi, dealerId)]
  }
}
