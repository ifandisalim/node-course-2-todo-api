
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

    // Reference to collection Todos then delete all document
    // with poperty text: 'Eat Lunch'
    // db.collection('Todos').deleteMany({
    //     text: 'Eat Lunch'
    // })
    // .then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete documents.');
    // });

    // db.collection('Todos').deleteOne({
    //     text: 'Eat Lunch'
    // })
    // .then((result) => {
    //     // result.deletedCount will be 1
    //     console.log('Affected document:', result.deletedCount);
    // }, (err) => {
    //
    // });

    // db.collection('Todos').findOneAndDelete({
    //     text: 'Something I have to do'
    // })
    // .then((result) => {
    //     // result.value consists of the deleted document
    //     console.log('You deleted the todo: ', result.value.text);
    // }, (err) => {
    //     console.log('Unable to delete the Todo');
    // });

    db.collection('Users').deleteMany({
        name: 'Ifandi Salim'
    })
    .then((result) => {
        console.log('Users deleted: ', result.deletedCount);
    }, (err) => {
        console.log('Unable to delete the user');
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5877b3c994c4b912582bdadc')
    })
    .then((result) => {
        console.log(`Deleted user ${result.value.name}`);
    }, (err) => {
        console.log('Unable to delete that user');
    });

});
