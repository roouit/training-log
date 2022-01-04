/**
 * A middleware function that validates exercise data.
 * If data is invalid, an error response is sent.
 * @param {Object} req - The request.
 * @param {Object} req.body - The object containing exercise data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.validateExercise = (req, res, next) => {
  const nameRegex = /^[a-öA-Ö\s]+$/
  if (nameRegex.test(req.body.exercise_name)) {
    next()
  } else {
    next({
      statusCode: 400,
      message: 'Exercise name must contain only letters'
    })
  }
}
