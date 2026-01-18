const express = require("express");
const router = express.Router();
const {
  getStock,
  addStock,
  updateStock,
} = require("../controllers/stockController");
const auth = require("../middleware/auth");

// ---------- Stock Routes ----------
router.get("/", auth, getStock);
router.post("/", auth, addStock);
router.put("/:id", auth, updateStock);

module.exports = router;
