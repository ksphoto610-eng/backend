const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");


router.get("/", (req, res) => {
  res.json({ message: "Offers working" });
});

module.exports = router;

// GET all offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching offers" });
  }
});

// POST create new offer
router.post("/", async (req, res) => {
  try {
    const { title, description, validDate } = req.body;

    const newOffer = new Offer({
      title,
      description,
      validDate,
    });

    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ message: "Error creating offer" });
  }
});

// DELETE offer
router.delete("/:id", async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);

    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting offer" });
  }
});

module.exports = router;
