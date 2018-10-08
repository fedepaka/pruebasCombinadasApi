var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

//USER ROUTES//
router.get('/users', user_controller.user_list);
//router.get('/users/saludo', user_controller.saludo);
//router.post('/users/saludoPost', user_controller.validateUser, user_controller.saludoPost);
router.get('/users/:id', user_controller.user_byId);

router.post('/user/create', user_controller.validateUser, user_controller.user_create);
router.get('/user/confirm/:token/:email', user_controller.user_confirm);
router.delete('/user/delete/:id', user_controller.user_delete);
router.put('/user/update/:id', user_controller.user_update);

module.exports = router;