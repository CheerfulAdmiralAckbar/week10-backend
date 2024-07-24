const { Favourite } = require('../models');

const addFavourite = async (req, res) => {
  try {
    const { userId, unsplashId, thumbnailUrl, authorName } = req.body;

    const newFavourite = await Favourite.create({
      userId,
      unsplashId,
      thumbnailUrl,
      authorName
    });

    res.status(201).json({ message: 'Image favorited successfully', favourite: newFavourite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
};

module.exports = { addFavourite };