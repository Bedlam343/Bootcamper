const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const keys = require("./config/keys");

// Connect to database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// trust proxy
// app.enable("trust proxy");

// Body parser (parse body of request)
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 10000,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
// app.use(cors());

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

// Moved to bootcamps.js
// app.get("/api/v1/bootcamps", (req, res) => {
//   // res.json({ name: "Jagi" });
//   // res.sendStatus(400);
//   res.status(200).json({ success: true, msg: "Show all bootcamps" });
// });

// app.get("/api/v1/bootcamps/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
// });

// app.post("/api/v1/bootcamps", (req, res) => {
//   res.status(200).json({ success: true, msg: "Create new bootcamp" });
// });

// app.put("/api/v1/bootcamps/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
// });

// app.delete("/api/v1/bootcamps/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
// listen for unhandledRejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process (with failture, hence the 1)
  server.close(() => process.exit(1));
});
