const express = require('express');
const router = express.Router();
const { shortUrl, getAllShortUrl } = require('./getUrl.js')

router.post('/', shortUrl)

router.get('/', getAllShortUrl)

module.exports = router;