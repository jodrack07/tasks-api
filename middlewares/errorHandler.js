const { CustomAPIError } = require('../util/custom-error');

/**
 * Instead of using the default built-in error handler message, this middleware will be used to handle our errors.
 * Notice that error handler middleware will be put after all #app.use().
 */
const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({SERVER_ERROR: 'Something went wrong. Please, try later...'});
    // return res.status(500).json({ status: "failed",  error: 'An error occured. Try later by following the specified indications.'});
}

module.exports = errorHandler;