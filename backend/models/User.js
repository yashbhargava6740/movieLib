const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    likedMovies: {
        type: Array,
        default:[],
    },
    playLists: {
        type: Array,
        default: []
    }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
