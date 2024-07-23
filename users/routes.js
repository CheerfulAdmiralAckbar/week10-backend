const { Router } = require('express');
const userRouter = Router();

const { register, login, verifyTokenController } = require('./controllers');

const { 
  hashPass, comparePass, verifyToken
} = require('../middleware');

userRouter.post("/register", hashPass, register);
userRouter.post("/login", comparePass, login);
userRouter.get("/verify-token", verifyToken, verifyTokenController);

module.exports = userRouter;