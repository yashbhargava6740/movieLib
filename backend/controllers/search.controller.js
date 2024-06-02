const axios = require('axios');
const Playlist = require('../models/Playlist');
const omdbApiKey = process.env.OMDB_API_KEY;

const getSearchedMovie = async (req, res, next) => {
	// console.log("searching for movies");
	const { query } = req.query;
	try {
		const omdbResponse = await axios.get(
			`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${query}`
		);

		res.status(200).json(omdbResponse.data.Search);
	} catch (error) {
		console.error('Error searching for movies:', error);
		res.status(500).json({ error: 'An error occurred while searching for movies.' });
	}
};
const getMovieById = async (req, res, next) => {
	// console.log("searching for movie by id");
	const { id: imdbID } = req.params;
	try {
		const omdbResponse = await axios.get(
			`http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`
		);
		const { Title, Year, Type, Poster } = omdbResponse.data;

		res.status(200).json({ Title, Year, imdbID, Type, Poster });
	} catch (error) {
		console.error('Error fetching movie details:', error);
		res.status(500).json({ error: 'An error occurred while fetching movie details.' });
	}
};
const fetchAllPublicPlaylists = async (req, res, next) => {
	try {
		const playlists = await Playlist.find({ visibility: true }).select('username playlistName movies');
		const playlistsWithDetails = await Promise.all(playlists.map(async (playlist) => {
			const moviesWithDetails = await Promise.all(playlist.movies.map(async (imdbID) => {
				try {
					const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`);
					const { Title, Type, Year, Poster } = response.data;
					return { Title, Type, Year, imdbID, Poster };
				} catch (error) {
					console.error('Error fetching movie details:', error);
					return null;
				}
			}));
			return { ...playlist.toObject(), movies: moviesWithDetails.filter(movie => movie !== null) };
		}));
		res.status(200).json({ ok: true, playlists: playlistsWithDetails });
	} catch (error) {
		console.error('Error fetching public playlists:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	getSearchedMovie,
	getMovieById,
	fetchAllPublicPlaylists,
};
