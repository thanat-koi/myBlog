var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('blog');
})

router.get('/add', (req, res, next) => {
    res.render('addBlog');
})

module.exports = router;