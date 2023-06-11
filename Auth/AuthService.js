const userModel = require('../Schema/UserSchema');
const bcrypt = require('bcryptjs');
const TokenService = require('./TokenService')

const AuthService = {
    async registration(username, password) {
            const existingUser = await userModel.findOne({ username });
            if(existingUser) {
                throw new Error('User with this nickname already exists');
            }
             const hashPassword = bcrypt.hashSync(password, 10);
             const user = await userModel.create({ username, password: hashPassword });
             const payload = {
                userId: user._id,
                username: user.username
            }
            const tokens = TokenService.generateTokens({ ...payload});
            await TokenService.saveToken(payload.userId, tokens.refreshToken);
            return { ...tokens, user: payload }
    },

    async login(username, password) {
            const user = await userModel.findOne({username});
            if(!user){
                throw new Error(`User ${username} was not found`);
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                throw new Error('Invalid password');
            }
            const payload = {
                userId: user._id,
                username: user.username
            }
             const tokens = TokenService.generateTokens({ ...payload});
             await TokenService.saveToken(payload.userId, tokens.refreshToken);
             return { ...tokens, user: payload }
    },
    async logOut(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    },

    async refreshToken(refreshToken) {

        if(!refreshToken){
            throw new Error('Invalid token')
        }
        const decodedData = TokenService.validateRefreshToken(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)
        if(!decodedData || !dbToken) {
            throw new Error('Invalid token')
        }
        const user = await userModel.findById(decodedData.userId);
        const payload = {
            userId: user._id,
            username: user.username
        }
         const tokens = TokenService.generateTokens({ ...payload});
         console.log(tokens.accessToken);
         await TokenService.saveToken(payload.userId, tokens.refreshToken);
         return { ...tokens, user: payload }
    }
}

module.exports = AuthService;