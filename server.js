const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

// import routers
const fleets = require("./routes/api/fleets");

const app = express();

require("dotenv").config();

// Connect Database
connectDB();

// Set cors
app.use(
  cors({
    origin: "*",
  })
);

// Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define Routes
app.use("/api/fleets", fleets);

app.get("/", (req, res) => {
  res.send("Server is working now on 5000 port...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
