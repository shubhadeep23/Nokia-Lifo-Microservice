const express = require('express');
const app = express();
const fileOwner = "server.js";
app.use(express.json({ limit: process.env.PAYLOAD_LIMIT }));
app.set("port", process.env.ENROLLMENT_UI_PORT)
const { correlationIdMiddleware } = require(`./v1/logger/corelation-id-middleware`);
const { createLogs } = require('./v1/logger/loggerMethod');
const router = require('./v1/router/compositeServiceRouter')
/**
 * Start Express Server
 */
const server = app
    .listen(app.get("port"), () => {
        createLogs('', '', 'server', fileOwner, 'ServerConnection', app.get("port"));
    })
    .on("error", (err) => {
        createLogs('', '', 'server', fileOwner, 'ServerError', err);
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Generate Trace Id per Request
app.use(function (req, res, next) {
    correlationIdMiddleware(req, res, next);
    next();
});

// Routes
app.use("/enrollment", router);

module.exports.server = server;
module.exports.app = app;