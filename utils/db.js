const mongoose = require("mongoose");
const logger = require("./logs");

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

logger.info("Initializing Database Connection...");

module.exports.openDBConnection = async (url) => {
  if (mongoose.connection.readyState === 1) {
    logger.info("MongoDB connection already established.");
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(url);
    logger.info("Successfully connected to MongoDB Database");
    return connection;
  } catch (err) {
    logger.error("MongoDB connection error. Ensure MongoDB is running.");
    logger.error(`Error: ${err.message}`);
    throw err; // Avoid wrapping the error unnecessarily
  }
};

module.exports.closeDBConnection = async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.disconnect();
      logger.info("MongoDB connection successfully closed.");
    } catch (err) {
      logger.error("Error while closing MongoDB connection.");
      logger.error(`Error: ${err.message}`);
      throw err;
    }
  } else {
    logger.info("No active MongoDB connection to close.");
  }
};
