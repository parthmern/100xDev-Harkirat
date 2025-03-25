import { NextFunction, Request, Response } from "express";
import client from "prom-client";

// Create a counter metric
const requestCounter = new client.Counter({
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
export const activeRequestsGauge = new client.Gauge({
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
export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestsGauge.inc();

    res.on('finish', function() {
        const endTime = Date.now();
        const duration = endTime - startTime;
    
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);

        activeRequestsGauge.dec();
    });
    next();
}

