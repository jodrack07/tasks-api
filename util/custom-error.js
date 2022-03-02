class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// const error = new Error('Task Not Found...',404);

/**
 * Since we will need to handle different error depending to their status code (e.g. 500, 404) in the #errorHandler function,
 * the cool option will be to create a function that will return the new instance of the CustomAPIError class.
 * With that will be able to check whether the #err (since it will refer to this function) param from the #errorHandler middleware
 * and check if it's an instance of the #CustomAPIError then send a different type of error message 
 */
const CreateCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
}

/**
 * -CustomAPIError will be used in errorHandler.js to check if #err is an instance of CustomAPIError
 * -CreateCustomer will be used in tasks.ctrl.js to set the message and the status code
 */
module.exports = {
    CustomAPIError,
    CreateCustomError
}
