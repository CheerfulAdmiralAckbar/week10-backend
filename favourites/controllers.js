const Favourite = require('./model');
console.log('Favourite model:', Favourite);

const addFavourite = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { userId, imageId, thumbnailUrl, authorName } = req.body;

    const newFavourite = await Favourite.create({
      userId: userId,
      unsplashId: imageId,
      thumbnailUrl: thumbnailUrl,
      authorName: authorName
    });

    res.status(201).json({ message: 'Image favorited successfully', favourite: newFavourite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
};

module.exports = { addFavourite };