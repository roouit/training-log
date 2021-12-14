/**
 * Will create and return an array, with a string with placeholders to be used in an SQL
 * UPDATE statement, and an array of placeholder values for the string. Placeholders
 * are created for each entry of object parameter, where the value is not undefined.
 * @param {Object} obj - An object with key-value pairs that correspond to database table
 * column names (key) and their new record value (value)
 * @returns {Array} An array that contains an SQL string with placeholders, and an array
 * containing placeholder values
 */
exports.getSetParams = (obj) => {
  /**
   * A string that contains the column names and placeholders.
   * @type {string}
   */
  let sql = ''
  /**
   * An array that contains the placeholder values.
   * @type {Array}
   */
  const queryValues = []
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      queryValues.push(value)
      sql += `${key} = ?, `
    }
  })
  return [sql.substring(0, sql.length - 2), queryValues]
}
