const axios = require('axios');

const omdbApiKey = process.env.OMDB_API_KEY;

const getSearchedMovie = async (req, res, next) => {
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

module.exports = {
	getSearchedMovie,
};
