const correlator = require(`../../correlation-id`);

correlationIdMiddleware = (req, res, next) => {

    correlator.withId(() => {
        const currentCorrelationId = correlator.getId();
        res.header(`x-trace-id`, currentCorrelationId);
    }, req.get(`x-trace-id`));
}

module.exports.correlationIdMiddleware = correlationIdMiddleware;