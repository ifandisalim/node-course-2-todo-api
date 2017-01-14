const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');


// Todo is imported mongoose model
Todo.remove({}).then((result) => {
    if(!result){
        console.log("Document not found");
        return;
    }
    console.log(`Document affected: ${result.result.n}`);
})
.catch((error) => {
    console.log(error);
});


Todo.findByIdAndRemove('5879fc8b77c0342f08228e1d').then((document) => {
    if(!document){
        console.log("Document not found");
        return;
    }
    // document is the document object removed.
    console.log(`Document removed: ${document}`);
})
.catch((error) => {
    console.log(error);
});



Todo.findOneAndRemove({_id: '5879fc8b77c0342f08228e1d'}).then((document) => {
    console.log(`Document Removed: ${document}` );
});
