const constant = require('../constants/constant')
//Create error format  
const createErrorJSON = (statusCode, error) => {
  const errorJSON = {
    status: statusCode,
    errorMessage: error
  }
  return errorJSON;
}

module.exports.createErrorJSON = createErrorJSON;