const express = require('express');
const usersControllers = require('../controllers/users');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', usersControllers.userCreate);

module.exports = router;
