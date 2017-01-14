const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');

var id = '5879fc8b77c0342f08228e1d';

// Todo is exported module which creates mongoose model
Todo.find({
    _id: id // auto create new ObjectID()
}). then((todos) => {
    // if empty
    if(!todos){
        return console.log("Id not found!");
    }
    console.log("Todos found", todos);
});
