const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');
const featureController = require("../controllers/features.controllers");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const orgController=require('../controllers/org.controllers')

router.post('/signup', userControllers.UserRegister);
router.post('/login', userControllers.UserLogin);

router.post('/feature', auth, role(['ADMIN']), featureController.createFeature);
router.get('/feature', auth, role(['ADMIN', 'USER']), featureController.getFeatures);
router.put('/feature/:id', auth, role(['ADMIN']), featureController.updateFeature);
router.get('/feature/check', auth, featureController.checkFeature);

router.post('/org',orgController.createOrg)
router.get('/getorg',orgController.getOrg)
module.exports = router;