const express = require('express');
const postsControllers = require('../controllers/posts');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', postsControllers.createPost);
router.get('/read/:id', postsControllers.readPost);
router.get('/read', postsControllers.readPosts);
router.put('/update/:id', postsControllers.updatePost);
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;
