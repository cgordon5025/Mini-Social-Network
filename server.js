const express = require('express')

//setting up the connection here
const db = require('./config/connection')
//unneccassary??
// const mongodb = require('mongodb').MongoClient;

const routes = require('./routes')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })
})
