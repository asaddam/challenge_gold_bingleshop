const express = require('express');
const router = express.Router();
const { register } = require('../middleware');
const controller = require('../controllers/auth');


router.post("/auth/signup", [
    register.checkDuplicateUsernameOrEmail,
    register.checkRolesExisted
], controller.register);

router.post('/auth/signin', controller.signin);

module.exports = router;