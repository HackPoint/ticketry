const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const username = "hackp0int";
const password = "123456";
const connStr = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@ds119675.mlab.com:19675/profiles`;

const ObjectID = mongodb.ObjectID;
const CONTACTS_COLLECTION = "tickets";

const app = express();
app.use(bodyParser.json());

var db;

const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};
console.log(connStr)
MongoClient.connect(connStr, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");

    const server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


// Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes
app.get("/api/tickets", function (req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(docs);
        }
    });
});

app.post("/api/tickets", function (req, res) {
    let newContact = req.body;

    // if (!req.body.name) {
    //     handleError(res, "Invalid user input", "Must provide a name.", 400);
    // }
    console.log(req);
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new ticket.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
