const express = require('express');
const bodyParser = require('body-parser');

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


app.listen(3000, () => {
    console.log('Started on port 3000');
});
