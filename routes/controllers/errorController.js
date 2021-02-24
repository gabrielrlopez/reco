const AppError = require('../../utils/appError')

const handleCastErrorDb = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDb = err => {
    const message = `Duplicate field value: ${err.keyValue.name}. Please use another name. `
    return new AppError(message, 400)
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(values => values.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid token please log in again!')
const handleJWTExpiredError = () => new AppError('Your token has expired. Please login again!', 404)

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message:err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message:err.message,
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        })
    }
}


//Global error handling middleware
module.exports = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res)
    } else if(process.env.NODE_ENV === 'production'){
        if (error.name === 'CastError') error = handleCastErrorDb(error);
        if (error.code === 11000) error = handleDuplicateFieldsDb(error);
        if (error.name === "ValidationError") error = handleValidationError(error);
        if (error.name === "JsonWebTokenError") error = handleJWTError(error);
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
        sendErrorProd(err, res)
    }
})