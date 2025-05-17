const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, foodController.createFoodItem) // Donate
  .get(foodController.getAllFoodItems);          // Browse

router.post('/:id/claim', protect, foodController.claimFoodItem); // Claim with quantity in body

router.get('/user', protect, foodController.getUserPostedItems);
router.get('/claimed', protect, foodController.getUserClaimedItems);

module.exports = router;
