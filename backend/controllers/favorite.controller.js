const axios = require('axios');
const User = require('../models/User');
const omdbApiKey = process.env.OMDB_API_KEY;
const getFavorite = async (req, res, next) => {
	const { likedMovies } = req.user;
	const dataArr = [];
	try {
		for (const id of likedMovies) {
			const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${id}`;
			const response = await axios.get(url);
			dataArr.push(response.data);
		}
		res.status(200).json({ data: dataArr });
	} catch (error) {
		console.error('Error searching for movies:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const modifyFavorite = async (req, res, next) => {
	// console.log('modify');
	try {
		const { imdbID, actionType } = req.body;
		const { _id } = req.user;

		if (!imdbID || !actionType || (actionType !== 'add' && actionType !== 'remove')) {
			return res.status(400).json({ error: 'Invalid request data.' });
		}

		if (actionType === 'add') {
			// console.log("adding");
			const user = await User.findById(_id);
			if (user) {
				user.likedMovies.push(imdbID);
				await user.save();
			}
		} else if (actionType === 'remove') {
			const user = await User.findById(_id);
			if (user) {
				const index = user.likedMovies.indexOf(imdbID);
				if (index !== -1) {
					user.likedMovies.splice(index, 1);
					await user.save();
				}
			}
		}
		// console.log('sending response');
		res.status(200).json({ message: 'Done' });
	} catch (error) {
		console.error('Error modifying favorite:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	getFavorite,
	modifyFavorite,
};
