const Logger = require('./winston');
const loggerwinston = new Logger('app');
//Varriable Declation for Logger
var loggingMessage = {}
var uriMethod = ''
var corelationalId = ''
var reqUri = ''
var requestHeader = ''
var loggingHeader = ''

//Generic Logger Method for Service
const createLogs = async (req, res, methodName, className, state, body) => {

  if (req > " ") {
    uriMethod = req.method;
    reqUri = req.url;
    requestHeader = req.headers;
    delete requestHeader.accept;
    delete requestHeader.connection;
    loggingHeader = JSON.stringify(requestHeader);
    corelationalId = req.headers['x-trace-id']
  }

  switch (state) {
    case 'Begins':
      switch (uriMethod) {
        case 'GET':
          messageBody = reqUri;
          break;
        case 'POST':
        case 'DELETE':
          messageBody = JSON.stringify(req.body);
          break;
        default:
          messageBody = '';
          break;
      }
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.info(loggingMessage);
      break;
    case 'Success':
      const jsonProjectData = JSON.stringify(body)
      messageBody = jsonProjectData
      loggingHeader = '';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.debug(loggingMessage);
      break;
    case 'Error':
      messageBody = body.toString();
      loggingHeader = '';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.error(loggingMessage);
      break;
    case 'Exits':
      messageBody = "";
      loggingHeader = '';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.info(loggingMessage);
      break;
    case 'ServerConnection':
      messageBody = body;
      corelationalId = '';
      loggingHeader = '';
      uriMethod = 'Connected';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.info(loggingMessage);
      break;
    case 'ServerError':
      messageBody = body;
      loggingHeader = '';
      corelationalId = 500;
      uriMethod = 'Connection Failure';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.error(loggingMessage);
      break;
    case 'Warn':
      messageBody = body.toString();
      loggingHeader = '';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.warn(loggingMessage);
      break;
    case 'DBConnection':
      messageBody = body;
      corelationalId = '';
      loggingHeader = '';
      uriMethod = 'Connected';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.info(loggingMessage);
      break;
    case 'DBError':
      messageBody = body;
      corelationalId = 400;
      loggingHeader = '';
      uriMethod = 'Connection Failure';
      loggingMessage = { corelationalId, uriMethod, methodName, className, state, messageBody, loggingHeader };
      loggerwinston.logger.error(loggingMessage);
      break;
  }

}

module.exports.createLogs = createLogs;