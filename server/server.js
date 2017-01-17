require('./config/config'); // most top of file

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const app = express();

const port = process.env.PORT || 3000;



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

    // get the id value passed in url
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send({success: "false", error: "Id is not valid"});
        return;
    }

    Todo.findById(id).then((document) => {
        if(!document){
            res.status(404).send({success: "false", error: "Todo with that ID is not found"});
            return;
        }

        res.send({success: "true", todo: document});
    })
    .catch((error) => {
        res.status(400).send({success: "false", error: "Error retrieving data"});
    });


});


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id; // Get id from url params

    // If id not valid return success false with status 400
    if(!ObjectID.isValid(id)){
        res.status(400).send({success: false, error: "ID is not valid."});
        return;
    }

    Todo.findByIdAndRemove(id).then((document) => {
        // If cant find return 404
        if(!document){
            res.status(404).send({success: false, error: "ID not found"});
            return;
        }

        res.send({success:true, removed:document});
    })
    .catch((error) => {
        res.status(400).send({success:false, error:error});
    });


});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        res.status(404).send({success: false, error: "Id is not valid."});
        return;
    }

    // Check if body.completed prop is boolean and check if its true
    if(_.isBoolean(body.completed) && body.completed){

        // If true then add another prop to body with current timestamp
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    // Update the document with new object called body and using $set
    // new: true tells the method to return us the new document after update
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((document) => {
            if(!document){
                res.status(404).send({success: false, error: "ID not found"});
            }

            res.send({success:true, updated:document});

        })
        .catch((error) => {
            res.status(400).send({success:false, error:error});
        });
});



app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth', token).send(user);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Started on port' , port);
});

module.exports = {
    app
};
