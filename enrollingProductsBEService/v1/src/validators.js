let Validator = require('validatorjs');

const validationBody = {
    "productName": "required|string",
    "description": "required|string",
    "cost": "required|string"

}

const toValidateMandetoryField = async (body) => {
    let errorMessage = ''
    const validation = new Validator(body, validationBody);
    if (validation.fails()) {
        errorMessage = validation.errors;
    }
    return errorMessage;
}

module.exports.toValidateMandetoryField = toValidateMandetoryField;