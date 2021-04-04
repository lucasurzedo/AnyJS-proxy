'use strict';

const express = require('express');
const router = express.Router();
const { requestsController } = require('../controllers');

// requests for store objects
router.post('/store/object', requestsController);
router.patch('/store/object/:objectName', requestsController);
router.put('/store/object/:objectName', requestsController);
router.get('/store/object/', requestsController);
router.get('/store/object/:objectName', requestsController);
router.delete('/store/object/:objectName', requestsController);

// requests for execute tasks
router.post('/execute/task', requestsController);
router.post('/execute/task/:taskName/execution', requestsController);
router.get('/execute/task', requestsController);
router.get('/execute/task/:taskName/execution', requestsController);
router.get('/execute/task/:taskName', requestsController);
router.get('/execute/task/:taskName/execution/:executionName', requestsController);
router.get('/execute/task/:taskName/execution/:executionName/:notification', requestsController);
router.delete('/execute/task/:taskName', requestsController);
router.delete('/execute/task/:taskName/execution/:executionName', requestsController);

module.exports = router;
