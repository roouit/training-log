/**
 * A middleware function that validates user data.
 * If data is invalid, an error response is sent.
 * @param {Object} req - The request.
 * @param {Object} req.body - The object containing exercise data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.validateUser = (req, res, next) => {
  const err = {
    statusCode: 400
  }
  const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
  const userNameRegex = /^[a-öA-Ö0-9_-]+$/
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!nameRegex.test(req.body.first_name)) {
    err.message = 'First name is not valid'
    next(err)
  } else if (!nameRegex.test(req.body.last_name)) {
    err.message = 'Last name is not valid'
    next(err)
  } else if (!emailRegex.test(req.body.email)) {
    err.message = 'Email is not valid'
    next(err)
  } else if (!userNameRegex.test(req.body.username)) {
    err.message = 'Username is not valid (can contain letters, numbers and symbols - and _)'
    next(err)
  } else {
    next()
  }
}
