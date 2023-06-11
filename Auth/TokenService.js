const jwt = require('jsonwebtoken');
const tokenModel = require('../Schema/TokenSchema')
const { ACCESS_TOKEN_SECRET, ACCESS_TIME, REFRESH_TOKEN_SECRET, REFRESH_TIME } = require('../config');

const TokenService = {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TIME });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TIME });
    
        return {
            accessToken,
            refreshToken}
    },

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, ACCESS_TOKEN_SECRET)
            return userData
        }catch(e) {
            return null
        }
    },

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, REFRESH_TOKEN_SECRET)
            return userData
        }catch(e) {
            return null
        }
    },

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    },

    async removeToken(refreshToken) {
        const decodedData = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const userId = decodedData.userId
        const tokenData = await tokenModel.findOneAndUpdate({ user: userId }, {refreshToken: null})
        return tokenData
    },

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }

}


module.exports = TokenService;