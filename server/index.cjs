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



// Route to get all databases with collections
// Route to get all databases with collections
// Route to get all databases with collections
// Route to get all databases with collections
app.get('/getAllDatabaseListWithCollections', async (req, res) => {
  try {
    // Switch to the 'admin' database
    const adminDb = mongoose.connection.useDb('admin');

    // Get the list of databases
    const databaseList = await adminDb.db.admin().listDatabases();

    // Extract names of databases
    const databaseNames = databaseList.databases.map(db => db.name);

    // Fetch collections for each database
    const databasesWithCollections = await Promise.all(databaseNames.map(async dbName => {
      const database = mongoose.connection.useDb(dbName); // Switch to the specific database

      // Ensure Mongoose has loaded the models for this database
      await database.modelNames();

      // Fetch collections using the native driver
      const collections = await database.db.listCollections().toArray();
      const collectionNames = collections.map(collection => collection.name);
      return { [dbName]: collectionNames };
    }));

    res.json(databasesWithCollections);
  } catch (error) {
    console.error('Error getting database list with collections:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/getCollectionByDatabase', async (req, res) => {
  try {
    const databaseName = req.body.dbname;

    if (!databaseName) {
      return res.status(400).json({ error: 'Database name is missing in the query parameters.' });
    }

    // Switch to the specified database
    const database = mongoose.connection.useDb(databaseName);

    // Ensure Mongoose has loaded the models for this database
    await database.modelNames();

    // Fetch collections using the native driver
    const collections = await database.db.listCollections().toArray();

    // Extract collection names
    const collectionNames = collections.map(collection => collection.name);

    res.json({ collections: collectionNames });
  } catch (error) {
    console.error('Error getting collection list by database:', error);
    res.status(500).send('Internal Server Error');
  }
});






// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
