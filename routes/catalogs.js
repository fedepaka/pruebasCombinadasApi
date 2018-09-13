var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

//USER ROUTES//
router.get('/users', user_controller.user_list);
router.get('/users/:id', user_controller.user_byId);
router.post('/user/create', user_controller.user_create);
router.delete('/user/delete/:id', user_controller.user_delete);
router.put('/user/update/:id', user_controller.user_update);

module.exports = router;