const { check } = require("express-validator");

const ebookValidation = [
    check('firstName', 'Name of user cannot be empty').notEmpty(),
    check('lastName', 'Surname of user cannot be empty').notEmpty(),
    check('email', 'Incorrect email syntax').isEmail(),
    check('phoneNumber', 'phoneNumber of user cannot be empty').notEmpty(),
    check('phoneNumber', 'Number must contain only digits').isNumeric()
]

module.exports = ebookValidation