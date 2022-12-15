// helpers
const response = require('@helpers/response')
const logHistoryHitApi = require('@helpers/logHistoryHitApi')

module.exports = {
  internalServerError: async (res, error, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, error, '500')
    response(res, 500, 'Internal Server Error', error)
  },

  notFound: async (res, message, data, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, JSON.stringify(data), '404')
    response(res, 404, message, data)
  },

  hasDeleted: async (res, message, data, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, JSON.stringify(data), '400')
    response(res, 400, message, data)
  },

  acoountInUse: async (res, data, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, JSON.stringify(data), '401')
    response(res, 401, 'Account Sedang Dipkai', data)
  },

  badInput: async (res, message, data, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, JSON.stringify(data), '400')
    response(res, 400, message, data)
  },

  success: async (res, message, data, linkApi, dealerId) => {
    await logHistoryHitApi.logHistoryHitApi(linkApi, dealerId, JSON.stringify(data), '200')
    response(res, 200, message, data)
  }
}
