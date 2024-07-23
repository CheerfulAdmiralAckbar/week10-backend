require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());


const syncTables = () => {
  // Sync Models
}

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});