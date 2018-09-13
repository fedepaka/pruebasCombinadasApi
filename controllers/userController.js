//var dataUser = require('../models/user');
var model = require('../models/index');

const {check, validationResult} = require('express-validator/check');

// Display list of all user.
exports.user_list = function (req, res) {
    res.send('NOT IMPLEMENTED: ser list');
};

// Handle User by Id
exports.user_byId = function (req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Handle User create.
exports.user_create = function (req, res) {

    //res.send(req.body);

    if (req && req.body) {
        const user = {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dateBirth: req.body.dateBirth,
            createdAt: new Date()
        };

        /*
        // username must be an email
        check('username').isEmail();
        // password must be at least 8 chars long and Alphanumeric
        check('password').isAlphanumeric({min: 8});
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }*/

        model.User.create(user).then(function (created) {
            res.send(created);
        }).then(user => res.status(201).json({
            error: false,
            data: user,
            message: 'New User has been created.'
        })).catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));

    } else {
        res.send(JSON.stringify({"status": 500, "error": null, "response": null, message: "No Body Specified"}));
    }
};

// Handle User Update
exports.user_update = function (req, res) {
    res.send('NOT IMPLEMENTED: User update');
};

// Handle User delete.
exports.user_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: User delete: ' + req.params.id);
};
