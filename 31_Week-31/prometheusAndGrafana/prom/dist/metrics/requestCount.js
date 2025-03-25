"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = exports.httpRequestDurationMicroseconds = exports.activeRequestsGauge = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
// Create a counter metric
const requestCounter = new prom_client_1.default.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
// export const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const startTime = Date.now();
//     res.on('finish', () => {
//         const endTime = Date.now();
//         console.log(`Request took ${endTime - startTime}ms`);
//         // Increment request counter
//         requestCounter.inc({
//             method: req.method,
//             route: req.route ? req.route.path : req.path,
//             status_code: res.statusCode
//         });
//     });
//     next();
// };
// GAUGE
exports.activeRequestsGauge = new prom_client_1.default.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
});
// export const cleanupMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const startTime = Date.now();
//     activeRequestsGauge.inc();
//     res.on('finish', function() {
//         const endTime = Date.now();
//         console.log(`gauge-Request took ${endTime - startTime}ms`);
//         requestCounter.inc({
//             method: req.method,
//             route: req.route ? req.route.path : req.path,
//             status_code: res.statusCode
//         });
//         activeRequestsGauge.dec();
//     });
//     next();
// }
// HISTOGRAM
exports.httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    exports.activeRequestsGauge.inc();
    res.on('finish', function () {
        const endTime = Date.now();
        const duration = endTime - startTime;
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        exports.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);
        exports.activeRequestsGauge.dec();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
