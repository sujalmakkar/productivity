var validator = require("email-validator");
 
async function isEmailValid(email) {
    return validator.validate(email);
}

module.exports = isEmailValid