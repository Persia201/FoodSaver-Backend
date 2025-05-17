const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number, // changed from String to Number
      required: true,
    },
    pickupLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    pickupLocationAddress: { // optional address string
      type: String,
      required: false,
    },
    expiryTime: {
      type: Date,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

foodItemSchema.index({ pickupLocation: '2dsphere' });

module.exports = mongoose.model('FoodItem', foodItemSchema);
