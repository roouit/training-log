const mysql = require('mysql')
const { dbConfig } = require('../../../config/db.config')

const pool = mysql.createPool(dbConfig)

/**
 * A promisified function for getting a connection from the mysql connection pool.
 * The returned connection also has promisified query and release functions.
 * @returns {Promise} A promise that has a connection from mysql pool
 */
const connection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
          connection.query(sql, binding, (err, result) => {
            if (err) reject(err)
            resolve(result)
          })
        })
      }
      const release = () => {
        return new Promise((resolve, reject) => {
          if (err) reject(err)
          resolve(connection.release())
        })
      }
      resolve({ query, release })
    })
  })
}

module.exports = { pool, connection }
