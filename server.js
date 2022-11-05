const express = require('express')

const mongodb = require('mongodb').MongoClient;

const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/networkDB`;

let db;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
)