const express = require('express')

const router = express.Router()

const   artController = require('../controllers/art.controller')

router.post('/create', artController.createArt)
router.post('/edit', artController.editArt)
router.post('/delete', artController.deleteArt)
router.get('/list', artController.view_all_art);

module.exports = router
