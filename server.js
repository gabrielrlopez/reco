const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

//Global uncaught exceptions (async handlers)
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const globalErrorHandler = require("./routes/controllers/errorController");
const AppError = require("./utils/appError");
const userRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const userBaseRoutes = require("./routes/api/base");
const recoRoutes = require("./routes/api/recos");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const app = express();
app.use(compression());

//Connect Database
connectDB();

//Security HTTP headers
app.use(helmet());

//Rate limiter
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

//Reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//Data sanitization against NOSQL query injection (removes mongo operators from request)
app.use(mongoSanitize());

//Data sanitization against XSS (removes malicious html code)
app.use(xss());

app.use("/api", limiter);

//Routes
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/base", userBaseRoutes);
app.use("/api/recos", recoRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Error handling for any routes trying to be accessed that do not exist
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//Global unhandled rejection handler
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
