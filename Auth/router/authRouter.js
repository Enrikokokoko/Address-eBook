const Router = require ('express')
const AuthController = require ('../AuthController')
const registrationValidation = require('../validation/authValidation')

const authRouter = new Router()

authRouter.post('/registration', registrationValidation , AuthController.registration);
authRouter.post('/login', AuthController.login)
authRouter.get('/refresh', AuthController.refreshToken)
authRouter.post('/logout', AuthController.logOut)


module.exports = authRouter;