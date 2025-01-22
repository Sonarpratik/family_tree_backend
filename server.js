const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const http = require("http");

dotenv.config();
const app = express();



const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes/index");

// Middleware
const allowedOrigin = [
  "http://localhost:5173",
 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// app.use(bodyParser.json());
app.use("/api", userRoutes);
// app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the "public" directory
// Serve static files from the "public" directory

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app); // Create HTTP server using Express app

// Connect to the database
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
