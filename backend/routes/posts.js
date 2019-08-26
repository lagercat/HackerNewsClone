const express = require('express');
const postsControllers = require('../controllers/posts');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', postsControllers.postCreate);
router.get('/read/:id', postsControllers.getPost);

module.exports = router;
