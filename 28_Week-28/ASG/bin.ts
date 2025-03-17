import cluster from "cluster"; // Import the cluster module to enable multi-core processing
import os from "os"; // Import the OS module to get the number of CPU cores
import { app } from "./index"; // Import the Express application from the index file

const numCPUs = os.cpus().length; // Get the total number of CPU cores available

// Check if the current process is the primary (master) process
if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork a worker process for each CPU core
    // This helps to take advantage of multi-core systems for better performance
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Create a new worker process
    }
} else {
    // If this is a worker process, start the server
    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started and server is running on port 3000`);
    });
}
