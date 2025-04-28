const errorMiddleware = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case 401:
            res.status(statusCode).json({ 
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 404:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message
            });
            break;
        case 500:
            res.status(statusCode).json({ 
                title: "Server Error",
                message: err.message
            });
            break;
        default:
            res.status(statusCode).json({ 
                title: "Something went wrong",
                message: err.message
            });
            break;
    }
};

module.exports = errorMiddleware