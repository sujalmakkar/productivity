const emailCheck = require('node-email-check');
 
async function isEmailValid(email) {
    return emailCheck.isValidSync(email);
}

module.exports = isEmailValid