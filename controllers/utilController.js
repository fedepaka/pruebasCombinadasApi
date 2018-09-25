const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync();


exports.encrypt = function (text){
    // var cipher = crypto.createCipher(algorithm,password)
    // var crypted = cipher.update(text,'utf8','hex')
    // crypted += cipher.final('hex');
    // return crypted;

    var hash = bcrypt.hash(text, salt, function(err, hash) {
        //console.log("paka" + hash);
        // Store hash in database
        return hash;
    });

    return hash;
}

exports.decrypt = function (passwordToCompare, paswordEncripted){
    // var decipher = crypto.createDecipher(algorithm,password)
    // var dec = decipher.update(text,'hex','utf8')
    // dec += decipher.final('utf8');
    // return dec;

    bcrypt.compare(passwordToCompare, paswordEncripted, function(err, res) {
        // res == true
        if(err) next();
        return res;
    });
}
