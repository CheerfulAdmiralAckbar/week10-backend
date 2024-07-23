require('dotenv').config();
const express = require('express');
const cors = require('cors');

const User = require('./users/model');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());


const syncTables = () => {
  // Sync Models
  User.sync({ alter: true })
}

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});