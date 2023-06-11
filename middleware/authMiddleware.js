const TokenService = require('../Auth/TokenService');

function authMiddleware (req, res, next) {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(403).json({ message: 'User is not authorized' });
        }
        const accessToken = token.split(' ')[1];
        if(!accessToken) {
            return res.status(403).json({ message: 'User is not authorized' });
        }

        const decodedData = TokenService.validateAccessToken(accessToken);
        if(!decodedData) {
            return res.status(403).json({ message: 'User is not authorized' });
        }
        req.user = decodedData;
        next();
    }catch(e){
        return res.status(403).json({ message: 'User is not authorized or Invalid token' });
    };
}

module.exports = authMiddleware;