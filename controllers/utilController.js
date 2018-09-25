const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync();


exports.encrypt = function (text){
    return bcrypt.hash(text, salt).catch(err => {
        throw (err);
    });
}

exports.decrypt = function (passwordToCompare, paswordEncripted){
    bcrypt.compare(passwordToCompare, paswordEncripted, function(err, res) {
        return res;
    }).catch(err => {
        throw (err);
    });
}
