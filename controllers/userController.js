//var dataUser = require('../models/user');
var model = require('../models/index');
var util = require('./utilController');

const {check, validationResult} = require('express-validator/check');

// Handle User create.
exports.user_create = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    if (req && req.body) {
        getHashPassword(req.body.password).then(pass => {
            const user = {
                username: req.body.username,
                password: pass,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dateBirth: req.body.dateBirth,
                createdAt: new Date(),
                uuidConfirm: util.generateNewUUid()
            };
            //console.log(user);
            // normal processing here
            model.User.create(user).then(function (created) {
                sendRequestConfirmEmail(user.username, user.uuidConfirm);
                res.send(created);
            });
        });
    } else {
        return res.json({result: "error", message: "error"});
    }
};

exports.validateUser = [
    check('username').isEmail().withMessage('el username debe ser un email.'),
    check('password').isNumeric().isLength({min: 8}).withMessage('el password debe ser alfanumérico con mínimo de 8 caracteres.'),
    check('firstname').isLength({min: 1}).withMessage('el nombre no puede ser vacío'),
    check('lastname').isLength({min: 1}).withMessage('el apellido no puee ser vacío'),
    check('username').custom((value, req) => {
        return getUserByUsername(req, value).then(user => {
            if (user) {
                return Promise.reject('El usuario ya existe.');
            }
        });
    }).withMessage('El usuario ya existe.')
];

function getUserByUsername(req, username) {
    return model.User.getUserByUsername(username);
}

function getUserToConfirm(username, token) {
    return model.User.getUserToConfirm(username, token);
}

function getHashPassword(username) {
    return util.encrypt(username).then(function (hash) {
        return hash;
    }).catch(err => {
        throw (err);
    })
}

function sendRequestConfirmEmail(username, hash) {
    let url = 'http://localhost:3000/v1/user/update?token=' + hash;
    let html = '<p>Presione&nbsp;<a title="Presione para validar cuenta" href="' + url + '">Aqu&iacute;</a> para validar cuenta</p>\n' +
        '<p>Pruebas combinadas Tool &reg;</p>';

    return util.sendEmail(null, username, "Confirmar cuenta de email", null, html).then(function (info) {
        return info;
    }).catch(err => {
        throw (err);
    })
}

// Handle User Update
exports.user_update = function (req, res) {
    res.send('NOT IMPLEMENTED: User update');
};

// Handle User delete.
exports.user_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: User delete: ' + req.params.id);
};

// Display list of all user.
exports.user_list = function (req, res) {
    res.send('NOT IMPLEMENTED: ser list');
};

// Handle User by Id
exports.user_byId = function (req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Handle confirm user by token and email
exports.user_confirm = function (req, res) {
    //res.send('NOT IMPLEMENTED: User detail: ' + req.params.token + '--' + req.params.email);
    var usuario = getUserToConfirm(req.params.email, req.params.token);
    if(usuario){
        model.User.update({
            confirmToken: req.params.token
        }).then(function (updated) {
            let url = 'www.google.com.ar';
            let html = '<p> Bienvenido a la aplicaci&oacute;: Presione&nbsp;<a title="Presione para iniciar sesi&iacute;" href="' + url + '">Iniciar Sesi&oacute;n</a> para validar cuenta</p>\n' +
                '<p>Pruebas combinadas Tool &reg;</p>';
            util.sendEmail(null, req.params.email, 'Confirmación exitosa de email.', null, url);
            res.send(updated);
        });
    }
    else {
        return res.json({result: "error", message: "error"});
    }
};