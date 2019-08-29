const express = require('express');
const commentsControllers = require('../controllers/comments');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', commentsControllers.createComment);
router.delete('/delete/:id', commentsControllers.deleteComment);

module.exports = router;
