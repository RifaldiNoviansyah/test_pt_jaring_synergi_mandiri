// model
const {
  dealers: dealerModels
} = require("@models")

// helper
const response = require("@helpers/response")
const errorResponse = require("@helpers/errorResponse")
const createAuth = require("@helpers/createAuth")
const uuid = require("@helpers/uuidGenerator");

// library
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const dealerData = await dealerModels.findOne({ where: { username: username, del_status: false } })/// /Check User if exist
      if (!dealerData) return errorResponse.notFound(res, "dealer not found")
      if (dealerData.status_login) return response(res, 401, "Account in use", null)

      // compare password
      const checkPassword = bcrypt.compareSync(password, dealerData.password)
      if (!checkPassword) return response(res, 404, "Password not match", null)

      const payload = {
        id: dealerData.id,
        username: dealerData.username,
      }

      const date = new Date()
      const expiredDate = date.setDate(date.getDate() + 1) + (
        1 // days
        * 12 // hours
        * 60 // minutes
        * 60 // seconds
        * 1000 // milliseconds
      )

      const jwtToken = jwt.sign({
        exp: expiredDate,
        data: payload,
      }, process.env.JWT)

      const refreshToken = uuid.uuid(120);

      // create auth
      const authData = await createAuth.findOrCreateAuth("login", refreshToken, jwtToken, expiredDate, dealerData.id)
      if (!authData) return response(res, 401, "Authentication Failed", null)

      if (authData.status_login === true) {
          dealerData.status_login = true
          await dealerData.save()
     }
      
      return response(res, 200, "Authentication Success", authData)
    } catch (error) {
      console.log(error)
      return errorResponse.internalServerError(res, error.message)
    }
  },
}
