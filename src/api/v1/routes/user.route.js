const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById
} = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id([0-9]+)', getUserById)
router.post('/', createNewUser)
router.delete('/:id([0-9]+)', deleteUserById)
router.put('/:id([0-9]+)', updateUserById)

module.exports = router
