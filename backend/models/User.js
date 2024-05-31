const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Make email field unique
    },
    password: {
        type: String,
        required: true
    },
    likedMovies: {
        type: Array,
        default: []
    }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
