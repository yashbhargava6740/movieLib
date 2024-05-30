const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json("Already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            return res.json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return res.json({ message: 'Invalid Credentials' });
        }

        const { _id, password: hashedPassword, ...userInfo } = validUser._doc;
        const token = jwt.sign({ id: _id }, process.env.JWT_SECRET);
        return res.cookie('jwt', token, { httpOnly: true }).status(200).json({ token: token, user: validUser._doc});

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    register,
    login,
};
