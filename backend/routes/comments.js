const express = require('express');
const commentsControllers = require('../controllers/comments');
const checkAuth = require('../middleware/check-auth.js');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', checkAuth, commentsControllers.createComment);
router.delete('/delete/:id', checkAuth, commentsControllers.deleteComment);

module.exports = router;
