const errorHandler = (err, req, res, next) => {
    const error = {
        success: false,
        status: err.status || 500,
        message: err.message || "An error has occured", 
        stack: process.env.NODE_ENV === 'production' ? 'Production' : 'Development'
    }
    res.send(error);
};

module.exports = errorHandler;