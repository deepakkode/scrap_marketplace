const express = require('express');
const router = express.Router();
const Explore = require('../models/explore');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { list, material, location, price } = req.body;
    const newEntry = new Explore({ list, material, location, price });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Explore.find();
    res.status(200).json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const entry = await Explore.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const entry = await Explore.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    const { list, material, location, price } = req.body;

    entry.list = list || entry.list;
    entry.material = material || entry.material;
    entry.location = location || entry.location;
    entry.price = price || entry.price;

    const updatedEntry = await entry.save();
    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const entry = await Explore.findByIdAndDelete(req.params.id); 
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    res.status(200).json({ message: 'Entry removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;