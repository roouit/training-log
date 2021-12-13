const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById
} = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id([0-9]+)', getUserById)
router.post('/', createNewUser)
router.delete('/:id([0-9]+)', deleteUserById)

module.exports = router
