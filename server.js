require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRouter = require('./users/routes');
const favouriteRouter = require('./favourites/routes');

const User = require('./users/model');
const Favourite = require('./favourites/model');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/favourites', favouriteRouter);


const syncTables = () => {
  // Associations
  User.hasMany(Favourite);
  FavouriteImage.belongsTo(User);

  User.sync({ alter: true });
  FavoriteImage.sync({ alter: true });
}

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});