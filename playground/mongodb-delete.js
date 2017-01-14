
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

    // Find document in collection Users using ObjectID then set its name and inc the age
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5877b80cbf11d530c0075c47') // Find this document
    },
    {
        // MongoDB Opeartor $set and $inc used to set name and increment age by 1
        $set:{
            name: 'Ifandi Salim'
        },
        $inc:{
            age: 1
        }
    },
    {
        returnOriginal: false
    })
    .then((result) => {
        console.log(`Changed the name to ${result.value.name}`);
        console.log(`${result.value.name} is now ${result.value.age}`);
    }, (err) => {
        console.log('Unable to update');
    });

});
