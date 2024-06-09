const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const redis = require('../client/Redis.js');
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });

    const user = await newUser.save();
    user.password = undefined;
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    await redis.set((validUser._id).toString(), JSON.stringify(validUser));
    await redis.expire((validUser._id).toString(),3600);
    // console.log("Setting cache while login ", (validUser._id).toString());
    const { _id, ...userInfo } = validUser._doc;
    userInfo.password = undefined;
    
    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ token, user: userInfo });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
