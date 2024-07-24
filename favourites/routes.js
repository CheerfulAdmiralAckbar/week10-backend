const { Router } = require('express');
const favouriteRouter = Router();

favouriteRouter.post("/favourite-image", verifyToken, addFavourite);

module.exports = favouriteRouter;