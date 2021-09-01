class ClientError extends Error {
    constructor(statuscode, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statuscode;
        this.message = message;
    }
}


const clientErrorHandler = (err, req, res, next) => {
    if (err instanceof ClientError) {
        const statusCode = err.statusCode;
        const message = err.message;
        res.status(statusCode).json({
            status: 'error',
            error: {
                statusCode,
                message
            },
        });
    }
    else {
        // if err is not client error then pass it to server error handler
        next(err);
    }
};

const serverErrorHandler = (err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        error: {
            statusCode: 500,
            message: 'Internal server error',
        },
    });
};

const notFoundErrorHandler = (req, res) => {
    res.status(404).json({
        status: 'error',
        error: {
            statusCode: 404,
            message: 'Not Found',
        },
    });
};

module.exports = { ClientError, clientErrorHandler, serverErrorHandler, notFoundErrorHandler };