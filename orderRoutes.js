const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/", (req, res) => {
  res.json({ message: "Orders working" });
});

module.exports = router;
module.exports = router;
// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// POST create new order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, productName, size, price, address } = req.body;

    const newOrder = new Order({
      customerName,
      phone,
      productName,
      size,
      price,
      address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = router;
