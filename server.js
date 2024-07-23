require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRouter = require('./users/routes');

const User = require('./users/model');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);


const syncTables = () => {
  // Sync Models
  User.sync({ alter: true })
}

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});