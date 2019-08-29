const express = require('express');
const commentsControllers = require('../controllers/comments');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', commentsControllers.commentCreate);
router.delete('/delete/:id', commentsControllers.commentDelete);

module.exports = router;
