const axios = require('axios');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
require("dotenv").config();
const omdbApiKey = process.env.OMDB_API_KEY;
const getFavorite = async (req, res, next) => {
	const { likedMovies } = req.user;
	// console.log(likedMovies);
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

const createPlaylist = async (req, res, next) => {
	try {
		const { id, playlistName, imdbID } = req.body;
		const { _id } = req.user;

		if (!id || !playlistName || !imdbID) {
			return res.status(400).json({ error: 'Invalid request data.' });
		}
		
		const user = await User.findById(_id);
		if (user) {
			const playlist = {
				id,
				playlistName,
				imdbIDs: [imdbID],
				visibility: true,
			};
			user.playLists.push(playlist);
			user.likedMovies.push(imdbID);
			const newPlaylist = new Playlist({
				user: _id,
				id,
				playlistName,
				username: user.name,
				visibility: true,
				movies: [imdbID]
			});
			newPlaylist.save();
			await user.save();

			res.status(200).json({ message: 'Playlist created successfully.' });
		} else {
			res.status(404).json({ error: 'User not found.' });
		}
	} catch (error) {
		console.error('Error creating playlist:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const modifyPlaylist = async (req, res, next) => {
	// console.log("Called modify route");
	try {
		const { playlistId, imdbID } = req.body;
		const { _id } = req.user;

		if (!playlistId || !imdbID) {	
			
			return res.status(400).json({ error: 'Invalid request data.' });
		}
		const user = await User.findById(_id);
		const playlist_ = await Playlist.findOne({ user: _id, id: playlistId });
		if (user) {
			const playlist = user.playLists.find((p) => p.id === playlistId);
			if (playlist) {
				if (user.likedMovies.includes(imdbID) || playlist.imdbIDs.includes(imdbID)) {
					console.log("returning");
					return res.status(400).json({ error: 'Movie already exists in user or playlist.' });
				}
				playlist.imdbIDs.push(imdbID);
				user.likedMovies.push(imdbID);
				user.markModified('playLists');
				await user.save();
				playlist_.movies.push(imdbID);
				await playlist_.save();
				res.status(200).json({ message: 'Playlist modified successfully.' });
			} else {
				res.status(404).json({ error: 'Playlist not found.' });
			}
		} else {
			res.status(404).json({ error: 'User not found.' });
		}
	} catch (error) {
		console.error('Error modifying playlist:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const fetchAllPlaylists = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const user = await User.findById(_id);
		if (user) {
			const playlists = user.playLists;
			res.status(200).json({ playlists });
		} else {
			res.status(404).json({ error: 'User not found.' });
		}
	} catch (error) {
		console.error('Error fetching playlists:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const updatePlaylistVisibility = async (req, res, next) => {
	try {
		// console.log(req.params);
		const { id } = req.params;
		const { _id } = req.user;

		if (!id) {
			return res.status(400).json({ error: 'Invalid request data.' });
		}

		const user = await User.findById(_id);
		const playlist = await Playlist.findOne({ user: _id, id });

		if (user && playlist) {
			user.playLists.forEach((p) => {
				if (p.id === id) {
					p.visibility = !p.visibility;
				}
			});
			user.markModified('playLists');
			await user.save();
			playlist.visibility = !playlist.visibility;
			playlist.save();
			res.status(200).json({ message: 'Playlist visibility updated successfully.' });
		} else {
			res.status(404).json({ error: 'Playlist not found.' });
		}
	} catch (error) {
		console.error('Error updating playlist visibility:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};


module.exports = {
	getFavorite,
	modifyFavorite,
	createPlaylist,
	modifyPlaylist,
	fetchAllPlaylists,
	updatePlaylistVisibility,
};
