
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
    //
    // // Insert a new document to Todos Collection
    // // Callback fires when process completed. Can be error or success
    // db.collection('Todos').insertOne({
    //     text: 'Something I have to do',
    //     completed: false
    //
    // }, (err, result) => {
    //     // Callback can be injected with error object or the result document thats inserted
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     // log the document that was inserted
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // });

    // db.collection('Users').insertOne({
    //     name: 'Ifandi Salim',
    //     age: 25,
    //     location: 'KL'
    // }, (err, result) => {
    //     if(err){
    //         console.log('Unable to insert user ', err);
    //         return;
    //     }
    //
    //     // Get time when the document is inserted to collection
    //     // [0] because result.ops is an array and in this example we only insert one document
    //     console.log("Inserted at ", result.ops[0]._id.getTimestamp());
    // });

    db.close(); // Close connection

});
