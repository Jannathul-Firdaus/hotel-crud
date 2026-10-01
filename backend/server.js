const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const pool = require("./db");
const hotelRoutes = require("./routes/hotelRoutes");

const app = express();


app.use(cors());
app.use(express.json());


const uploadDir =
  process.env.UPLOAD_DIR ||
  path.join(__dirname, "uploads");

app.use(
  "/uploads",
  express.static(uploadDir)
);


app.use("/api/hotels", hotelRoutes);


app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Hotel CRUD Backend is running",
      database: "PostgreSQL connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});