const express = require('express');
const router = express.Router();
const {createMeme, listMemes, retrieveMeme, deleteMeme, updateMeme, subscribe} = require('../controllers/memes');

router.post('/', createMeme);
router.get('/', listMemes);

router.get('/subscribe', subscribe);

router.get('/:id', retrieveMeme);
router.patch('/:id', updateMeme);
router.delete('/:id', deleteMeme);

module.exports = router;
