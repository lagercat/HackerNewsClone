const express = require('express');
const postsControllers = require('../controllers/posts');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', postsControllers.postCreate);

module.exports = router;
