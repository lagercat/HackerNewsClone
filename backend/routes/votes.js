const express = require('express');
const votesControllers = require('../controllers/votes');

const routerObj = express.Router;
const router = routerObj();

router.post('/create', votesControllers.createVote);
router.delete('/delete/:id', votesControllers.deleteVote);

module.exports = router;
