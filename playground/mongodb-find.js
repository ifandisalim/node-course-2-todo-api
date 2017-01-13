
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// Connect to database TodoApp on address localhost:27017
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    // If have error then print message to cmd
    if(err){
        console.log('Unable to connect to MongoDb Server.');
        return;
    }

    console.log('Connected to MongoDB server.');

    // Reference to the collection Todos
    // Query to find all documents, convert them to array
    // toArray() returns a promise. If success return the docs object
    // db.collection('Todos').find().count().then( (count) => {
    //     console.log('Queried doc count: ', count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({
        name: 'Ifandi Salim'
    })
    .toArray().then( (docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch user data');
    });

    // db.close(); // Close connection

});
