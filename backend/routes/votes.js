const express = require('express');
const votesControllers = require('../controllers/votes');
const checkAuth = require('../middleware/check-auth.js');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', checkAuth, votesControllers.createVote);
router.delete('/delete/:id', checkAuth, votesControllers.deleteVote);

module.exports = router;
