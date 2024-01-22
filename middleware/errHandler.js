export const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode
    res.status(statusCode).json({
        message: err.message,
    })
}