const express = require('express')

const router = express.Router()

const   usersController = require('../controllers/user.controller')

router.post('/create', usersController.createUser)
router.post('/login', usersController.start_session)
//router.post('/edit', accountController.edit_account)
router.post('/delete', usersController.deleteUser)
router.get('/list', usersController.view_all_users);

module.exports = router
