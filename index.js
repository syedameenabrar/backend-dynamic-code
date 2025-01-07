// Custom Imports
const app = require("./app");
const config = require("./config/index");
const logger = require("./utils/logs");
const openDataBase = require("./utils/db");

let server;

// Open database connection and start the server
const startServer = async () => {
    try {
        // Connect to the database
        await openDataBase.openDBConnection(config.DATABASE);
        // Start the server
        server = app.listen(config.PORT, () => {
            logger.info(`App is running at http://localhost:${config.PORT}`);
            logger.info(`${app.get("env")} Mode`);
            logger.info("Press CTRL-C to stop\n");
        });

        // Handle server close event
        server.on("close", () => {
            logger.info("Server is shutting down");
        });
    } catch (error) {
        logger.error("Failed to start the server:", error.message);
        process.exit(1); // Exit with failure code
    }
};

// Gracefully handle server shutdown
const shutdownServer = async () => {
    logger.info("Graceful shutdown initiated...");
    try {
        if (server) {
            server.close(() => {
                logger.info("HTTP server closed");
            });
        }
        // Close database connection
        await openDataBase.closeDBConnection(config.DATABASE);
        process.exit(0); // Exit successfully
    } catch (error) {
        logger.error("Error during shutdown:", error.message);
        process.exit(1); // Exit with failure code
    }
};

// Handle termination signals
process.on("SIGINT", shutdownServer); // CTRL+C
process.on("SIGTERM", shutdownServer); // Termination signal from the OS

// Start the server
startServer();


