const Stock = require("../models/Stock");

// Get all stock entries
exports.getStock = async (req, res) => {
  try {
    const stock = await Stock.find().populate("productId", "name price");
    res.json(stock);
  } catch (err) {
    console.error("Error fetching stock:", err);
    res.status(500).json({ message: "Server error while fetching stock" });
  }
};

// Add new stock entry
exports.addStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity == null) {
      return res.status(400).json({ message: "productId and quantity are required" });
    }

    const stockEntry = new Stock({ productId, quantity });
    await stockEntry.save();
    res.status(201).json(stockEntry);
  } catch (err) {
    console.error("Error adding stock:", err);
    res.status(500).json({ message: "Server error while adding stock" });
  }
};

// Update stock entry
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Stock entry not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ message: "Server error while updating stock" });
  }
};
