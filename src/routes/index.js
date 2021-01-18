'use strict';

const express = require('express');
const router = express.Router();
const { requestsController } = require('../controllers');

router.post('/instantiate/store', requestsController);
router.post('/instantiate/access', requestsController);
router.post('/execute/task', requestsController);
router.post('/execute/task/:taskName/execution', requestsController);
router.get('/execute/task', requestsController);
router.get('/execute/task/:taskName/execution', requestsController);
router.get('/execute/task/:taskName', requestsController);
router.get('/execute/task/:taskName/execution/:executionName', requestsController);
router.delete('/execute/task/:taskName', requestsController);
router.delete('/execute/task/:taskName/execution/:executionName', requestsController);
module.exports = router;
