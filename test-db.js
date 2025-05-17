const mongoose = require('mongoose');
const FoodItem = require('./models/FoodItem');
require('dotenv').config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Connected to MongoDB Atlas');

    // Insert a test food item
    const testFood = new FoodItem({
      title: 'Test Donated Rice',
      description: 'Leftover rice from dinner',
      quantity: 2,
      pickupLocation: { coordinates: [77.6, 12.9] }, // Bengaluru
      expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      donor: new mongoose.Types.ObjectId()
    });

    await testFood.save();
    console.log('📦 Saved test food item:', testFood._id);

    // Clean up
    await FoodItem.findByIdAndDelete(testFood._id);
    console.log('🗑️ Cleaned up test data');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
};

testConnection();