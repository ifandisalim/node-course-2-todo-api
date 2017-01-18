var {User} = require('./../models/User');

//middleware to authenticate
// this middleware can be used by other route app.get('/route', authenticate, (req, res))
var authenticate = (req,res,next) => {

    // Get token from header
    var token = req.header('x-auth');

    // Call static method set up in mongoose to retrieve user using token
    // This token will be decoded inside findByToken()
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }

        // If user found, middleware will set it to header
        req.user = user;
        req.token = token;
        next(); // Call next so next function runs
    })
    .catch((error) => {
        res.status(401).send();
    });
};

module.exports = {
    authenticate
};
