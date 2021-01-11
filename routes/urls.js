const express = require('express');
const router = express.Router();

const {redirectUrl, shortenUrl, getUsersPaths} = require('../Controllers/UrlController');

const middlewares = require('../middlewares');

router.get('/', getUsersPaths)
router.get('/:path', redirectUrl);
router.post('/scripts/shortenUrl', middlewares.validateUrl, middlewares.shortenUrl, middlewares.setCookie, 
middlewares.getTitle, shortenUrl)

module.exports = router;