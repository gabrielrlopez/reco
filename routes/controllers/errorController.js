const AppError = require('../../utils/appError')

const handleDuplicateFieldsDB = (err) => {
    const message = `Duplicate field value: ${err.keyValue.name}. Please use another name.`
    return new AppError(message, 400)
}

//Global error handling middleware
module.exports = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(err.code === 11000) handleDuplicateFieldsDB(err)

    res.status(err.statusCode).json({
        status: err.status,
        message:err.message
    })
})