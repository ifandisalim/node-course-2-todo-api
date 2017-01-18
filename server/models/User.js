const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema( {
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    password:{
        type: String,
        required: true,
        minlength:6
    },

    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Override default method toJSON
// using ES5 function() because we need to use this keyword
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// using ES5 function() because we need to use this keyword
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';

    // Create token, using {id, access} as payload and abc123 as secret
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // push the access and token into token array in User Model
    user.tokens.push({access, token});

    // return the .then() and the token so it can be chained later
    return user.save().then(() => {
        return token;
    });
};

// .statics is a property that will attach new methods to Model NOT the instance of the Model
// instance is when you var user = new User();
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123');
    }catch (error){
        // If error return a promise.reject so client code can catch this in .catch()
        return  Promise.reject();
    }

    // find user using filter object including id, token and access
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });

};

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
