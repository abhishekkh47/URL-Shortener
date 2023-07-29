const express = require('express');
const router = express.Router();
const { shortUrl, getAllShortUrl, urlRedirect } = require('./getUrl.js')

router.post('/', shortUrl)

router.get('/', getAllShortUrl)
router.get('/:urlId', urlRedirect)

module.exports = router;