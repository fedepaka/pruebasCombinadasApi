var User = require('../models/user');

// Display list of all user.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: ser list');
};

// Handle User by Id
exports.user_byId = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Handle User create.
exports.user_create = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};

// Handle User Update
exports.user_update = function(req, res) {
    res.send('NOT IMPLEMENTED: User update');
};

// Handle User delete.
exports.user_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete: ' + req.params.id);
};
