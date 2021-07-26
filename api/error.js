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

module.exports = {serverErrorHandler, notFoundErrorHandler};