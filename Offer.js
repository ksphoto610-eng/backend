const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    validDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
