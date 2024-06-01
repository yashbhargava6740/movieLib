const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    id: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true,
    },
    movies: {
        type: Array,
        default: [],
    },
    username: {
        type: String,
        required: true,
    },
    playlistName: {
        type: String,
        required: true,
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;