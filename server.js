// ---------- Required Packages ----------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

// ---------- Initialize Express ----------
const app = express();

// ---------- Middlewares ----------
app.use(cors());
app.use(express.json()); // JSON data parse ke liye

// ---------- MongoDB Connection ----------
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inventoryDB";

mongoose
  .connect(mongoURI) // Mongoose v7+ me options remove kiye
  .then(() => console.log("✅ MongoDB connected successfully to:", mongoose.connection.name))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ---------- Import Routes ----------
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");

// ---------- Setup Routes ----------
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/stock", stockRoutes);

// ---------- Test Route ----------
app.get("/", (req, res) => {
  res.send("Server running successfully ✅");
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
