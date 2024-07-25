require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRouter = require('./users/routes');
const favouriteRouter = require('./favourites/routes');

const User = require('./users/model');
const Favourite = require('./favourites/model');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
;app.use(express.json());

app.use('/users', userRouter);
app.use('/favourites', favouriteRouter);


const syncTables = async () => {
  // Users will have many favourites and favourites will belong to a user
  User.hasMany(Favourite, { foreignKey: 'userId' });
  Favourite.belongsTo(User, { foreignKey: 'userId' });

  // Sync tables
  await User.sync({ alter: true });
  await Favourite.sync({ alter: true });
}

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});