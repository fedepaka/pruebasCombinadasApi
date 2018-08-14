'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        idUsuario: {
            type: DataTypes.BIGINT(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
    return User;
};