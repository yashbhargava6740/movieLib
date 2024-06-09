const jwt = require('jsonwebtoken');
const USER = require('../models/User.js');
const asyncHandler = require('express-async-handler');
const redis = require('../client/Redis.js');
require('dotenv').config();
const protect = asyncHandler(async (req, res, next) => {
    // console.log('printting token',req.headers.authorization);
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const _id = decoded.id;
            const cache_data = await redis.get(_id); 
            if(cache_data) {
                req.user = cache_data;
            }
            else {
                const user = await USER.findOne({_id}).select();
                req.user = user;
                // console.log("Setting cache", _id);
                await redis.set(_id, JSON.stringify(user));
                await redis.expire(_id,3600);
            }
            next();
        }
        catch {
            res.status(500);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token) {
        // console.log(req.body, req.headers);
        res.status(500);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect }