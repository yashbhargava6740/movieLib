const express = require('express');
const FavoriteController = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/all').get(protect, FavoriteController.getFavorite);
router.route('/').post(protect, FavoriteController.modifyFavorite);

module.exports = router;
