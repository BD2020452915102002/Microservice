const { MongoClient } = require('mongodb');

const connect = (dbConfig, mediator) => {
    if (!mediator) throw new Error('Missing Mediator Database');
    if (!dbConfig) throw new Error('Missing DB Config');
    if (!dbConfig.dbUri || !dbConfig.dbName) throw new Error('Missing DB URI or DB Name');

    MongoClient.connect(dbConfig.dbUri)
        .then((client) => {
            const db = client.db(dbConfig.dbName);
            mediator.emit('DB connected', db);
        })
        .catch((err) => {
            mediator.emit('DB connection error', err);
        });
};

module.exports = { connect };
