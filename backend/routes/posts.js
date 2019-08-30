const express = require('express');
const postsControllers = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth.js');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', checkAuth, postsControllers.createPost);
router.get('/read/:id', postsControllers.readPost);
router.get('/read', postsControllers.readPosts);
router.put('/update/:id', checkAuth, postsControllers.updatePost);
router.delete('/delete/:id', checkAuth, postsControllers.deletePost);

module.exports = router;
