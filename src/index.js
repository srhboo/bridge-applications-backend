const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");
const { authenticateUser } = require("./utils/authentication");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 3001;

logger.info("🤖 Initializing middleware");

app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.stream }));

app.use(authenticateUser);

app.use("/", router);
app.use(errorHandler);

// Serve the application at the given port
app.listen(port, () => {
  logger.info(`🎧 Listening at http://localhost:${port}/`);
  console.log("updated");
});
