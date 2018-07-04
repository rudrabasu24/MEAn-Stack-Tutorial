/* ===================
   Import Node Modules
=================== */
var mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
var bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
    // Check if e-mail exists
    if(!email) {
        return false;
    } else if(email.length < 5 || email.length > 30) { // Check the length of e-mail string
        return false; // Return error if not within proper length
    } else {
        return true; // Return as valid e-mail
    }
}

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
    if(!email) {
        return false;
    } else {
        // Regular expression to test for a valid e-mail
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }
}

// Validate Function to Check Username Length
let usernameLengthChecker = (username) => {
    // Check if username exists
    if(!username) {
        return false
    } else {
        // Check length of username string
        if(username.length < 3 || username.length >15) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid username
        }
    }
}

// Validate Function to Check if Valid Username Format
let validUsername = (username) => {
    if(!username) {
        return false;
    } else {
        // Regular Expression to Test for a Valid Username
        const regExp = new RegExp(/^[a-z0-9]+$/);
        return regExp.test(username);
    }
}

// Validate Function to Check Password Length
let passwordLengthChecker = (password) => {
    // Check if password exists
    if(!password) {
        return false
    } else {
        // Check length of password string
        if(password.length < 6 || password.length >16) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid password
        }
    }
}

// Validate Function to Check if Valid Password Format
let validPassword = (password) => {
    if(!password) {
        return false;
    } else {
        // Regular Expression to Test for a Valid Password
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,16}$/);
        return regExp.test(password);
    }
}

// Array of Email Validators
const emailValidators = [
    { validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 30' },
    { validator: validEmailChecker, message: 'Must be a valid email' },
];

// Array of Username Validators
const usernameValidators = [
    { validator: usernameLengthChecker, message: 'Username must be at least 3 characters but no more than 15' },
    { validator: validUsername, message: 'Username can be in alphanumeric form and but not contain any special character' }
]

// Array of Password Validators
const passwordValidators = [
    { validator: passwordLengthChecker, message: 'Email must be at least 6 characters but no more than 16' },
    { validator: validPassword, message: 'Must have at least one uppercase, lowercase, special character, and number' }
];

// User Model Definition
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase:true, validate: emailValidators },
    username: { type: String, unique: true, lowercase:true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if(!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);