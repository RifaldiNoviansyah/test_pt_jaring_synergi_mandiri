// model
const { dealers: dealerModels } = require('@models')
// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyDealer = require('@helpers/validate_input_body/dealers/validateInputBodyDealer')
// library
const bcrypt = require("bcryptjs");

module.exports = {
  create: async (req, res) => {
    const dealerId = null
    const linkApi = '/api/web/service_status -create-'
    try {
      const { 
        name, 
        username, 
        password, 
        address
    } = req.body

      const dataError = await validateInputBodyDealer.validateInputBodyDealer(res, req.body, linkApi, dealerId)
      if (dataError === undefined) {
        const dealerData = await dealerModels.create({
          name,
          username,
          password: bcrypt.hashSync(password),
          address,
          del_status: false,
          created_at: new Date(),
          updated_at: new Date()
        })
        return success(res, 'Data Service Booking Berhasil Dibuat', dealerData, linkApi, dealerId)
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
