const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    materialType: {
      type: String,
      required: true,
      enum: ['plastic', 'cotton', 'iron', 'steel', 'aluminum', 'copper'],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', ListingSchema);