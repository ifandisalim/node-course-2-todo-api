const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    // In callback function, salt passed in is the generated salt
    bcrypt.hash(password, salt, (err, hash) => {

        // hash passed into callback of hash() is the hashed value
        // Compare used to compare if text password is equal to hashed password
        bcrypt.compare(password, hash, (err, res) => {
            // res will be true
            console.log("Password and hash matched? ", res);
        });

    });
});



// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, 'supersecret');
// console.log(token);
//
//
// // Token should be received back from client
// // Use the secret we used to sign and this will return the data passed when sign
// var decodedToken = jwt.verify(token, 'supersecret');
// console.log(decodedToken);
//
// // var message = 'I am user number 3';
//
// // hash will be a long string
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);
//
// // Data consisting user id
// var data = {
//     id : 4
// };
//
// // Pass this token back to client
// // Consists of original hash with secret salt
// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'secretsalt').toString()
// };
//
//
// // When client make request, they send in token.
// // The data in token is hashed and compared with original hash
// // If equal, then data didnt change, they are authenticated
// var resultHash = SHA256(JSON.stringify(token.data) + 'secretsalt').toString();
//
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed! Hash dont match');
// }
