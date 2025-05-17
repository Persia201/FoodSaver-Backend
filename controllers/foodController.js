const FoodItem = require('../models/FoodItem');

// Create a food item (Donate)
exports.createFoodItem = async (req, res) => {
  try {
    const { title, description, quantity, pickupLocation, pickupLocationAddress, expiryTime } = req.body;

    const foodItem = new FoodItem({
      donor: req.user.id,
      title,
      description,
      quantity: Number(quantity), // convert to number
      pickupLocation,
      pickupLocationAddress, // optional
      expiryTime,
    });

    const savedItem = await foodItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Create food item error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all food items (Browse)
exports.getAllFoodItems = async (req, res) => {
  try {
    const now = new Date();
    const foodItems = await FoodItem.find({
      expiryTime: { $gt: now }, // filter out expired
      quantity: { $gt: 0 }      // filter out zero quantity
    }).populate("donor", "name email");
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Claim food item with quantity validation and decrement
exports.claimFoodItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const claimQty = Number(quantity);

    if (!claimQty || claimQty <= 0) {
      return res.status(400).json({ message: "Invalid claim quantity" });
    }

    const item = await FoodItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity < claimQty) {
      return res.status(400).json({ message: "Claim quantity exceeds available units" });
    }

    item.quantity -= claimQty;
    if (item.quantity === 0) {
      item.claimedBy = req.user.id;
    }
    await item.save();

    res.json({ message: "Item claimed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Donor's posted items
exports.getUserPostedItems = async (req, res) => {
  try {
    const items = await FoodItem.find({ donor: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Recipient's claimed items
exports.getUserClaimedItems = async (req, res) => {
  try {
    const items = await FoodItem.find({ claimedBy: req.user.id }).populate("donor", "name email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
