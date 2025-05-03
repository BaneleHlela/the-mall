//not Found

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);

    next(error);
};

// Error Handler

export const errorHandler = (err, req, res, next) => {
    // Determine the status code: if the current status is 200, set it to 500, else keep the current status
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // if (err.errors && Array.isArray(err.errors)) {
    //     // This is likely a validation error (express-validator sends errors this way)
    //     return res.status(400).json({
    //       message: 'Validation Error',
    //       errors: err.errors.map(e => ({
    //         field: e.param,
    //         message: e.msg,
    //       })),
    //     });
    // }
    
    res.status(statusCode).json({
        message: err?.message, // Default message if none provided
        stack: err?.stack // Include stack trace in development only
    });

    next();
};







