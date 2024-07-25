const { Router } = require('express');
const favouriteRouter = Router();

const { addFavourite, getFavourites } = require('./controllers');
const { verifyToken } = require('../middleware/auth');

favouriteRouter.post("/favourite-image", verifyToken, addFavourite);
// Pass the userId in the URL to get all favourites for that user
favouriteRouter.get("/getAllFavourites/:userId", verifyToken, getFavourites);

module.exports = favouriteRouter;