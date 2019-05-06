var express = require('express');

var toHome = express.Router();

router.get('/', function(req, res) {
    res.send('welcome to api');
});

module.exports = router;