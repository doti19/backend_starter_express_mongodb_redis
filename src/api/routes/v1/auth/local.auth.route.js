const express = require('express');

const {requireLocalAuth, requireJwtAuth} = require('../../../../middlewares/auth');

const {authController} = require('../../../controllers');
const router = express.Router();
router.post("/requestResetPassword", authController.requestPasswordReset);
router.post("/resetpassword/:token", authController.resetPassword);
router.patch("/changePassword", requireJwtAuth, authController.changePassword);

router.post('/login', requireLocalAuth, authController.login);


router.post('/register', authController.register);



router.post('/refresh', authController.refresh);

router.post("/logout", requireJwtAuth, authController.logout);


// Your code goes here

module.exports = router;
