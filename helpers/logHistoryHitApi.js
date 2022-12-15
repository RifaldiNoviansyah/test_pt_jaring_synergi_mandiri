const {
    log_history_hit_apis: logHistoryHitApiModels
  } = require('@models')
  
  const IP = require('ip')
  const geoip = require('geoip-lite')
  
  module.exports = {
    logHistoryHitApi: async (linkApi, dealerId, data, statusCode) => {
      try {
        const ipAddress = IP.address()
        const geo = geoip.lookup(ipAddress)
  
        await logHistoryHitApiModels.create({
          dealer_id: dealerId,
          time_hit_api: new Date(),
          api_name: linkApi,
          city_name: geo === null ? null : geo.city,
          country_name: geo === null ? null : geo.country,
          ip_address: ipAddress,
          status_code: statusCode,
          data,
          del_status: false,
          created_at: new Date(),
          updated_at: new Date()
        })
      } catch (error) {
        console.log('##Error logHistoryUser function', error)
      }
    }
  }
  