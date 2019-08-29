const express = require('express');
const usersControllers = require('../controllers/users');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', usersControllers.createUser);
router.post('/authenticate', usersControllers.loginUser);

module.exports = router;
