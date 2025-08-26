const mongoose = require('mongoose');

const ExploreSchema = new mongoose.Schema(
  {
    list: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Explore', ExploreSchema);