const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const featureController = require("../controllers/features.controllers");
const auth = require("../middleware/Auth");
const role = require("../middleware/role");

router.post('/signup', userControllers.UserRegister);
router.post('/login', userControllers.UserLogin);

router.post('/feature', auth, role(['ADMIN']), featureController.createFeature);
router.get('/feature', auth, featureController.getFeatures);
router.put('/feature/:id', auth, role(['ADMIN']), featureController.updateFeature);
router.post('/feature/check', auth, featureController.checkFeature);

module.exports = router;