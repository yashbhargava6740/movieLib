const express = require('express');
const FavoriteController = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/all').get(protect, FavoriteController.getFavorite);
router.route('/').post(protect, FavoriteController.modifyFavorite);
router.route('/createPlaylist').post(protect, FavoriteController.createPlaylist);
router.route('/modifyPlaylist').post(protect, FavoriteController.modifyPlaylist);
router.route('/playlists').get(protect, FavoriteController.fetchAllPlaylists);
router.route('/updateVisibility/:id').put(protect, FavoriteController.updatePlaylistVisibility);

module.exports = router;
