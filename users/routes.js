const { Router } = require('express');
const userRouter = Router();

const { register, login, verifyTokenController } = require('./controllers');

userRouter.post("/register", register);
userRouter.post("/login",  login);

module.exports = userRouter;