// index.js

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;


// Use the routes defined in auth.js

mongoose.connect('mongodb://localhost:27017/designio', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

// Define a route for the home page
app.get('/', (req, res) => {
  res.json(['hello']);
});

// console.log('Declared routes:', listEndpoints(app));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
