const express = require('express');
const SearchController = require('../controllers/search.controller');
const router = express.Router();
router.get('/', SearchController.getSearchedMovie);
router.get('/find/:id', SearchController.getMovieById);
router.get('/playlists',  SearchController.fetchAllPublicPlaylists)
module.exports = router;
