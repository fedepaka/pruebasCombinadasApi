//var dataUser = require('../models/user');
var model = require('../models/index');
var util = require('utilController');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (req && req.body) {
        const user = {
            username: req.body.username,
            password: encrypt(req.body.password),//req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dateBirth: req.body.dateBirth,
            createdAt: new Date()
        };

        console.log(user);

        // normal processing here
        model.User.create(user).then(function (created) {
            res.send(created);
        });

    } else {
        return res.json({result: "error", message: "error"});
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

exports.saludo = saludo;
exports.saludoPost = saludoPost;

exports.validateUser = [
    check('username').isEmail().withMessage('el username debe ser un email.'),
    check('password').isNumeric().isLength({min: 8}).withMessage('el password debe ser alfanumérico con mínimo de 8 caracteres.'),
    check('firstname').isLength({min: 1}).withMessage('el nombre no puede ser vacío'),
    check('lastname').isLength({min: 1}).withMessage('el apellido no puee ser vacío'),

    
    check('username').custom((value, req ) => {
        return getUserByUsername(req, value).then(user => {
            if(user){
                return Promise.reject('El usuario ya existe.');
            }
        });
    }).withMessage('El usuario ya existe.')
];

function getUserByUsername(req, username) {
    return model.User.getUserByUsername(username);
}