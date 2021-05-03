var winston = require('winston');


// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: process.env.DEBUG_LEVEL,
        filename: `../logs/enrollingUIService.log`,
        noCorrelationIdValue: `nocorrelation`,
        handleExceptions: true,
        json: true,
        maxsize: 25000000, // 25MB
        maxFiles: 15,
        colorize: false,
    },
    console: {
        level: process.env.DEBUG_LEVEL,
        handleExceptions: true,
        noCorrelationIdValue: `nocorrelation`,
        json: false,
        colorize: true,
    },
};

dateFormat = () => {
    return new Date(Date.now()).toUTCString()
}

class loggerService {
    constructor(route) {
        this.log_data = null
        this.route = route
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(options.console),
                new winston.transports.File(options.file)
            ],
            format: winston.format.combine(
                winston.format.printf((info) => {
                    let message = `${dateFormat()} | ${info.level.toUpperCase()} |${info.message.corelationalId} |${info.message.uriMethod}|${info.message.className}|${info.message.methodName}|${info.message.state}|${info.message.messageBody} |${info.message.loggingHeader} |`;
                    return message
                })
            )
        });
        this.logger = logger;
        // const setLogData = (log_data) => {
        //     this.log_data = log_data
        // }
        // const info = async (message) => {
        //     this.logger.log('info', message)
        // }

        // const infoObj = async (message, obj) => {
        //     this.logger.log('info', message, { obj })
        // }

        // const debug = async (message) => {
        //     this.logger.log('debug', message)
        // }

        // const debugObj = async (message, obj) => {
        //     this.logger.log('debug', message, { obj })
        // }
        // const error = async (message) => {
        //     this.logger.log('error', message)
        // }

        // const errorObj = async (message, obj) => {
        //     this.logger.log('error', message, { obj })
        // }
    }
}



module.exports = loggerService
