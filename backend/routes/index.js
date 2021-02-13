const express = require('express');
const router = express.Router();
const ping = require('../controllers/ping');
const memesRouter = require('./memes');

/**
 * Routes from incoming request to middlewares, other routers and controllers
 */

router.get('/ping', ping)
router.use('/memes', memesRouter);

module.exports = router;
