var express = require('express');
var router = express.Router();
var model = require('../models/index');
const { check, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Express' });
});

router.post('/', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], function(req, res, next) {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    res.json({ title: 'post ok' });
});

router.get('/:username',  function(req, res, next) {
    const username = req.params.username;
    //var pepe = model.User.getUser(username);

    //console.log(pepe);

    res.json({ title: 'post ok' , obj:  model.User.getUser(username)});

});

module.exports = router;
