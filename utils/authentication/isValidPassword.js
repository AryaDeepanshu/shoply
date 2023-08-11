const passwordValidator = require('password-validator')

const schema = new passwordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()


function isValidPassword(password){
    const isValidPassword = schema.validate(password);
    if (!isValidPassword)
        return false;
    return true;
}

module.exports = isValidPassword