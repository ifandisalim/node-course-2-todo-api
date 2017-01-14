const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const app = express();

// Will parase all incoming application/json request body
app.use(bodyParser.json());

/*
    Post with url /todos
    Takes JSON from client and save it in configured mongodb
*/
app.post('/todos', (req, res) => {

    // Create a new model using predefined Todo mongoose model
    var todo = new Todo({
        text: req.body.text
    });

    // Attempt to save to db
    todo.save().then((document) => {

        // if success, send back the document that was saved
        res.send(document);
    }, (error) => {

        // If error set status and send back error obj
        res.status(400).send(error);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send({status: "failed", error: "Id is not valid"});
        return;
    }

    Todo.findById(id).then((document) => {
        if(!document){
            res.status(404).send({status: "failed", error: "Todo with that ID is not found"});
            return;
        }

        res.send({status: "success", todo: document});
    })
    .catch((error) => {
        res.status(400).send({status: "error", error: "Error retrieving data"});
    });


});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};
