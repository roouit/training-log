const moment = require('moment')

/**
 * A middleware function that validates query parameters when fetching workouts.
 * If parameter is valid, it is formatted (if applicable) and saved to req.query
 * object. If any of the parameters are invalid or there are unknown parameters,
 * an error is raised.
 * @param {Object} req - The request.
 * @param {Object} req.query - The object containing all query parameters
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.validateWorkoutQueryParams = (req, res, next) => {
  const parameters = { ...req.query }
  Object.entries(parameters).forEach(([key, value]) => {
    switch (key) {
      case 'offset':
        if (Number.isInteger(parseInt(value))) {
          req.query.offset = parseInt(value)
        } else {
          next({
            statusCode: 400,
            message: 'Invalid parameter offset'
          })
        }
        break
      case 'limit':
        if (Number.isInteger(parseInt(value))) {
          req.query.limit = parseInt(value)
        } else {
          next({
            statusCode: 400,
            message: 'Invalid parameter limit'
          })
        }
        break
      case 'asc':
        if (value.trim() === 'true' || value.trim() === 'false') {
          req.query.asc = Boolean(value)
        } else {
          next({
            statusCode: 400,
            message: 'Invalid parameter asc'
          })
        }
        break
      case 'olderThan':
        if (value.trim() === 'true' || value.trim() === 'false') {
          req.query.olderThan = Boolean(value)
        } else {
          next({
            statusCode: 400,
            message: 'Invalid parameter olderThan'
          })
        }
        break
      case 'date':
        if (!moment(value).isValid()) {
          next({
            statusCode: 400,
            message: 'Invalid parameter date'
          })
        }
        break
      default:
        next({
          statusCode: 400,
          message: `Parameter not recognized: ${key}`
        })
        break
    }
  })
  next()
}
