const dotenv = require('dotenv');

dotenv.config();

exports.PORT = process.env.PORT || 5000;

exports.DB_URL = process.env.DB_URL;

exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.ACCESS_TIME = process.env.ACCESS_TIME;

exports.REFRESH_TIME = process.env.REFRESH_TIME;