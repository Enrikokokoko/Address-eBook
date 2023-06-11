const { check } = require("express-validator");

const registrationValidation = [
    check('username', 'Name of user cannot be empty').notEmpty(),
    check('password', 'Password must be more than 4 and less than 10 characters long').isLength({min:4, max:10})
];

module.exports = registrationValidation;