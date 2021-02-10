const express = require('express');
const router = express.Router();
const ping = require('../controllers/ping');
const memesRouter = require('./memes');

router.get('/', ping)
router.use('/memes', memesRouter);

module.exports = router;
