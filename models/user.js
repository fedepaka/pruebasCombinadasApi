'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        /*id: {
            type: DataTypes.BIGINT(),
            primaryKey: true,
            autoIncrement: true
        },*/
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dateBirth: {
            type: DataTypes.DATE(),
            allowNull: false
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    User.getUserByUsername = function(username) {
        const query = { where: {
            username: {
                [Op.eq]: username
            }
        }};
        return User
            .findOne(query)
            .then(user => {
                return user
            })
            .catch(err => {
                throw (err);
            })
    };

    User.getUserByEmailToken = function(email, token) {
        const query = { where: {
                username: {
                    [Op.eq]: email
                },
                confirmtoken: {
                    [Op.eq]: token
                }
            }};
        return User
            .findOne(query)
            .then(user => {
                return user
            })
            .catch(err => {
                throw (err);
            })
    };

    return User;
};



// obtener
// module.exports.User.findUserByEmail = function(callback, username) {
//     User.findOne({
//         where:
//             {
//                 username:
//                     {[Op.eq]: username}
//             }
//     }).then(function (user) {
//         callback(null, user);
//     }).catch(function (err) {
//         callback(err, null);
//     });
//
// };
