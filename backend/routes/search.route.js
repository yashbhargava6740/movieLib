const express = require('express');
const SearchController = require('../controllers/search.controller');
const router = express.Router();
router.get('/find/:id', SearchController.getMovieById);
router.get('/playlists',  SearchController.fetchAllPublicPlaylists)
router.get('/', SearchController.getSearchedMovie);
module.exports = router;
