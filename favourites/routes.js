const { Router } = require('express');
const favouriteRouter = Router();

const { addFavourite } = require('./controllers');
const { verifyToken } = require('../middleware/auth');

favouriteRouter.post("/favourite-image", verifyToken, addFavourite);

module.exports = favouriteRouter;