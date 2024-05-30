const router = require("express").Router();
const { register, login } = require("../controllers/authControllers");
require('dotenv').config();
router.post("/register", register);
router.post("/login", login);
module.exports = router;
