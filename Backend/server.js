const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exploreRoutes = require('./routes/exploreRoutes');
const listingRoutes = require('./routes/listingroute');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/explore', exploreRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to ScrapConnect API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});