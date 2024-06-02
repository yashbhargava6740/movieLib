const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const searchRoute = require('../routes/search.route');
const favoriteRoute = require('../routes/favorite.route');
const { connectDB } = require('../config/dbConnect');
const app = express();
require("dotenv").config();
const init = async() => {
    const con = await connectDB();
    if(!con) process.exit(1);
    app.use(express.json());
    app.use(cors());
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });
    app.get("/", (req,res) => {
        res.send("Welcome");
    });
    app.use("/", (req,res) => {
        res.status(200).send("Welcome to the movie app");
    });
    app.use("/user", authRoutes);
    app.use('/api/movies/search', searchRoute);
    app.use('/api/movies/favorites', favoriteRoute);
}

module.exports = { init };