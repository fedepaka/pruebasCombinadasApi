const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync();
var nodeMailer = require('nodemailer');
const uuidv4 = require('uuid/v4');

//métodos de encriptación/decriptación
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

//métodos de envío de email
exports.sendEmail = function (from, to, subject, plainBody, htmlBody) {

    let configSmtpAccount = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mytestmailservice@gmail.com',
            pass: 'mytestmailservice123456'
        }};

    let transporter = nodeMailer.createTransport(
        configSmtpAccount
    );
    // let mailOptions = {
    //     from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
    //     to: req.body.to, // list of receivers
    //     subject: req.body.subject, // Subject line
    //     text: req.body.body, // plain text body
    //     html: '<b>NodeJS Email Tutorial</b>' // html body
    // };

    let mailOptions = {
        from: from || configSmtpAccount.auth.user, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: plainBody, // plain text body
        html: htmlBody // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //return console.log(error);
            console.log(error);
            throw (error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return info;
    });
}

//create ramdon uuid
exports.generateNewUUid = function () {
    return uuidv4();
}