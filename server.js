const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ---------- Middlewares ----------
app.use(cors());
app.use(express.json());

// ---------- MongoDB Connection ----------
// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inventoryDB")
  .then(() => {
    console.log("MongoDB connected successfully to:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ---------- Routes Import ----------
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");

// ---------- Routes Setup ----------
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/stock", stockRoutes);

// ---------- Test Route ----------
app.get("/", (req, res) => {
  res.send("Server running");
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
