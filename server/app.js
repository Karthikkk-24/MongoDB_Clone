import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000;

// Configure winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

app.use(express.json());

const databaseport = 27017;
const tempDatabase = "designio";

mongoose.connect(`mongodb://localhost:${databaseport}/${tempDatabase}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        logger.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.json(['hello']);
});

app.all('/getAllDatabaseList', async (req, res) => {
    try {
        const adminDb = mongoose.connection.useDb('admin');
        const databaseList = await adminDb.db.admin().listDatabases();
        const adminDatabaseExists = databaseList.databases.some(db => db.name === 'admin');

        if (!adminDatabaseExists) {
            await adminDb.createCollection('dummyCollection');
        }

        const allDbList = await mongoose.connection.db.admin().listDatabases();
        const databaseNames = allDbList.databases.map(db => db.name);

        res.json(databaseNames);
    } catch (error) {
        console.error('Error getting database list:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getAllDatabaseListWithCollections', async (req, res) => {
    try {
        const adminDb = mongoose.connection.useDb('admin');
        const databaseList = await adminDb.db.admin().listDatabases();
        const databaseNames = databaseList.databases.map(db => db.name);

        const databasesWithCollections = await Promise.all(databaseNames.map(async dbName => {
            const database = mongoose.connection.useDb(dbName);
            await database.modelNames();
            const collections = await database.db.listCollections().toArray();
            const collectionNames = collections.map(collection => collection.name);
            return { [dbName]: collectionNames };
        }));

        res.json(databasesWithCollections);
    } catch (error) {
        logger.error('Error getting database list with collections:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/getCollectionByDatabase', async (req, res) => {
    try {
        const databaseName = req.body.dbname;

        if (!databaseName) {
            return res.status(400).json({ error: 'Database name is missing in the query parameters.' });
        }

        const database = mongoose.connection.useDb(databaseName);
        await database.modelNames();
        const collections = await database.db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        res.json({ collections: collectionNames });
    } catch (error) {
        logger.error('Error getting collection list by database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/createCollection', async (req, res) => {
    try {
        const { dbname, collectionname } = req.body;

        if (!dbname || !collectionname) {
            return res.status(400).json({ error: 'Database name and collection name are required in the request body.' });
        }

        const database = mongoose.connection.useDb(dbname);
        await database.db.createCollection(collectionname);

        res.json({ success: true, message: `Collection '${collectionname}' created in database '${dbname}'` });
    } catch (error) {
        logger.error('Error creating collection:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/createDatabaseAndCollection', async (req, res) => {
    try {
        const { dbname, collectionname } = req.body;

        if (!dbname || !collectionname) {
            return res.status(400).json({ error: 'Both dbname and collectionname are required in the request body.' });
        }

        // Switch to the 'admin' database
        const adminDb = mongoose.connection.useDb('admin');

        // Create a new database
        await adminDb.db.admin().command({ create: dbname });

        // Switch to the newly created database
        const newDb = mongoose.connection.useDb(dbname);

        // Create a new collection within the new database
        await newDb.createCollection(collectionname);

        res.send(`New database "${dbname}" and collection "${collectionname}" created successfully`);
    } catch (error) {
        console.error('Error creating database and collection:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getDatabaseMetadata', async (req, res) => {
    try {
        // Fetch the list of databases
        const adminDb = mongoose.connection.useDb('admin');
        const databaseList = await adminDb.db.admin().listDatabases();
        const adminDatabaseExists = databaseList.databases.some(db => db.name === 'admin');

        if (!adminDatabaseExists) {
            await adminDb.createCollection('dummyCollection');
        }

        const allDbList = await mongoose.connection.db.admin().listDatabases();
        const databaseNames = allDbList.databases.map(db => db.name);

        // Fetch metadata for each database
        const databaseMetadata = [];

        for (const dbName of databaseNames) {
            const database = mongoose.connection.useDb(dbName);
            const dbStats = await database.db.command({ dbStats: 1 });
            const collections = await database.db.listCollections().toArray();
            
            databaseMetadata.push({
                name: dbName,
                totalStorageSize: dbStats.dataSize,
                totalCollections: collections.length,
            });
        }

        // Render the mainDatabases view with database metadata and formatBytes
        // res.render('mainDatabase', { databaseMetadata, formatBytes });
        res.json(databaseMetadata);

    } catch (error) {
        console.error('Error getting database list:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/getCollectionMetadataByDatabase', async (req, res) => {
    try {
        const databaseName = req.body.dbname;

        if (!databaseName) {
            return res.status(400).json({ error: 'Database name is missing in the request body.' });
        }

        const database = mongoose.connection.useDb(databaseName);

        const collections = await database.db.listCollections().toArray();
        const collectionMetadata = [];

        for (const collection of collections) {
            const stats = await database.db.command({ collStats: collection.name });

            const metadata = {
                name: collection.name,
                size: stats.size,
                documentCount: stats.count,
                storageSize: stats.storageSize,
            };

            collectionMetadata.push(metadata);
        }

        res.json({ collections: collectionMetadata });
    } catch (error) {
        console.error('Error getting collection metadata by database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/connectToHost', (req, res) => {
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
