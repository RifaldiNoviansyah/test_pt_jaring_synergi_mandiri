// helpers
const { internalServerError, success } = require('@helpers/errorResponse')
const validateInputBodyDealer = require('@helpers/validate_input_body/dealers/validateInputBodyDealer')
// query
const { queryGetOneDealer } = require('@query/dealers/findOne')
// library
const bcrypt = require("bcryptjs");

module.exports = {
  update: async (req, res) => {
    const dealerId = req.params.dealerId
    const linkApi = `/api/web/dealer/${dealerId} -update-`
    try {
      const { 
        name, 
        username, 
        password, 
        address
    } = req.body
      const dealerData = await queryGetOneDealer(linkApi, dealerId, res)
      if(dealerData !== undefined){
        const dataError = await validateInputBodyDealer.validateInputBodyDealer(res, req.body, linkApi, dealerId)
        if (dataError === undefined) {

          dealerData.name = name,
          dealerData.username = username,
          dealerData.address = address,
          dealerData.password = bcrypt.hashSync(password),
          dealerData.updated_at = new Date()
          await dealerData.save()

          const result = {
            id: dealerData.id,
            name: dealerData.name,
            username: dealerData.username,
            address: dealerData.address,
            delStatus: dealerData.del_status
          }
          return success(res, 'Ubah Dealer Berhasil', result, linkApi, dealerId)
        }
      }
    } catch (error) {
      console.log(error)
      return internalServerError(res, error.message, linkApi, dealerId)
    }
  }
}
