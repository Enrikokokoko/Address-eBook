const AuthService = require('./AuthService');
const { validationResult } = require('express-validator'); 


const AuthController = {
    async registration(req, res) {
        const { username, password } = req.body;
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error ', errors});
            }     
            const user = await AuthService.registration(username, password);
            res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(201).json(user);
        } catch(e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error'})   ;         
        }
    },

    async login(req, res) {
        const {username, password} = req.body;
        try{         
            const user = await AuthService.login(username, password);
            res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(user);
        } catch(e) {
            console.log(e);
            res.status(400).json({ message: 'Login error'}) ;           
        }
    },

    async logOut(req, res){
        try{
            const {refreshToken} = req.cookies
            const token = await AuthService.logOut(refreshToken)
            res.clearCookie('refreshToken')
             return res.status(200).json(token)
        }catch(e){
            return res.status(500).json({ message: 'logout error'})
        }
    },

    async refreshToken(req, res) {
        try{
            const {refreshToken} = req.cookies;
            const user = await AuthService.refreshToken(refreshToken);
            res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(user);
     }catch(e){
        return res.status(403).json({ message: 'Refresh token error'})
     }
    }   
}
    

module.exports = AuthController;