/**
 * Checks contents of err object and sends an error response to client.
 * @function The general error handler function
 * @param {Object} err - The error.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
const errorController = (err, req, res, next) => {
  if (err.sqlMessage) {
    res.status(500).send({
      statusCode: 500,
      message: 'Error in database',
      error: err
    })
  } else {
    if (err.statusCode) {
      res.status(err.statusCode).send({
        ...err
      })
    } else {
      res.status(400).send({
        statusCode: 400,
        ...err
      })
    }
  }
}

module.exports = errorController
