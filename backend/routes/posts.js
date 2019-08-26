const express = require('express');
const postsControllers = require('../controllers/posts');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', postsControllers.createPost);
router.get('/read/:id', postsControllers.readPost);
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;
