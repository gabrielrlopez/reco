const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const profileController = require('../controllers/profileController')
const recoController = require('../controllers/recoController')

//Send a new reco
router.post('/sendReco', authController.protect, recoController.sendNewReco)

//Delete a reco 
router.put('/deleteReco', 
    authController.protect,
    recoController.deleteReco
)

//Mark reco as seen
router.put('/markAsSeen',
    authController.protect,
    recoController.markRecoAsSeen
)

module.exports = router