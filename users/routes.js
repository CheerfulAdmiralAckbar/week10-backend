const { Router } = require('express');
const userRouter = Router();

const { register, login, verifyTokenController } = require('./controllers');

const { verifyToken } = require('../middlewares');

userRouter.post("/register", register);
userRouter.post("/login",  login);
userRouter.get("/verify-token", verifyToken, verifyTokenController);

module.exports = userRouter;