const express = require('express');
const app = express();
const fileOwner = "server.js";
app.use(express.json());
const logger = require('./v1/logger/loggerMethod')
const { createLogs } = require('./v1/logger/loggerMethod');
const router = require('./v1/router/enrollmentRouter')
app.set("port", process.env.ENROLLMENT_BE_PORT);
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

/**
 * Start Express Server
 */
const server = app
    .listen(app.get("port"), () => {
        createLogs('','','server',fileOwner,'ServerConnection',app.get("port"));    
    })
    .on("error", (err) => {
        createLogs('','','server',fileOwner,'ServerError',err);
    });

app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// Routes
app.use("/enrollment", router);


module.exports.app = app;
module.exports.server =server;