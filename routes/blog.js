var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const monk = require('monk')
const url = 'localhost:27017/BlogDB';
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
  })

router.get('/', (req, res, next) => {
    res.render('blog');
})

router.get('/add', (req, res, next) => {
    res.render('addBlog');
})

router.post('/add', [
    check("name", "Please input your article name").notEmpty(),
    check("description", "Please input your description").notEmpty(),
    check("author", "Please input your author").notEmpty()

], (req, res, next) => {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        console.log(errors);
        res.render('addBlog', {errors: errors});
        //return res.status(400).json({ errors: errors });
    } else {
        const collection = db.get('blogs');
        collection.insert({
            name: req.body.name,
            desription: req.body.desription,
            author: req.body.author,

        }, (err, blogs) => {
            if(err) {
                res.send(err);
            } else {
                res.location('/blog/add');
                res.redirec('/blog/add');
            }
        })
    }
});

module.exports = router;