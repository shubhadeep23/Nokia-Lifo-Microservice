const moment = require('moment');
const toCreateInsertionBody = async (body) => {
  var today = moment();
  body.date_manu = moment(Date.parse(today)).format('YYYY-MM-DD');;
  return body;
}

const createErrorJSON = (statusCode, error) => {
  const errorJSON = {
    status: statusCode,
    errorMessage: error
  }
  return errorJSON;
}
module.exports.toCreateInsertionBody = toCreateInsertionBody;
module.exports.createErrorJSON = createErrorJSON;