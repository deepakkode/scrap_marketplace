const express = require('express');
const router = express.Router();
const Listing = require('../models/listing'); 
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', verifyToken, upload.array('images', 5), async (req, res) => {
  try {
    const { materialType, price, quantity, location, description } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const newListing = new Listing({
      materialType,
      price,
      quantity,
      location,
      description,
      images,
      seller: req.user.id,
    });
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('seller', 'username email'); // Use 'username' instead of 'name'
    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('seller', 'username email'); // Use 'username'
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', verifyToken, upload.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.seller.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const { materialType, price, quantity, location, description } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : listing.images;

    listing.materialType = materialType || listing.materialType;
    listing.price = price || listing.price;
    listing.quantity = quantity || listing.quantity;
    listing.location = location || listing.location;
    listing.description = description || listing.description;
    listing.images = images;

    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.seller.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;