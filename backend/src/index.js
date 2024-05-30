const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
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
    app.use("/user", authRoutes);
}

module.exports = { init };