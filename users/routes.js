const { Router } = require('express');
const userRouter = Router();

const { register, login, verifyTokenController } = require('./controllers');

const { 
  hashPass, comparePass, verifyToken
} = require('../middleware/auth');

userRouter.post("/register", hashPass, register);
userRouter.post("/login", comparePass, login);

module.exports = userRouter;