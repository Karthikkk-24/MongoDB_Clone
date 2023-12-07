const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/designio', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

// Define a route for the home page
app.get('/', (req, res) => {
  res.json(['hello']);
});

// Route to get all databases
// Route to get all databases
app.get('/getAllDatabaseList', async (req, res) => {
  try {
    // Switch to the 'admin' database
    const adminDb = mongoose.connection.useDb('admin');

    // Get the list of databases
    const databaseList = await adminDb.db.admin().listDatabases();

    // Extract only the names of databases
    const databaseNames = databaseList.databases.map(db => db.name);

    res.json(databaseNames);
  } catch (error) {
    console.error('Error getting database list:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
