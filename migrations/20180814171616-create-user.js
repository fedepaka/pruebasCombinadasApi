'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      return queryInterface.createTable('Users', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.BIGINT
          },
          username: {
              type: Sequelize.STRING(50)
          },
          password: {
              type: Sequelize.STRING(50)
          },
          firstName: {
              type: Sequelize.STRING(50)
          },
          lastName: {
              type: Sequelize.STRING(50)
          },
          dateBirth: {
              allowNull: false,
              type: Sequelize.DATE
          },
          uuidConfirm: {
              type: Sequelize.STRING(50),
              allowNull: false
          },
          confirmed:{
              type: Sequelize.BOOLEAN,
              defaultValue: false
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          deleted: {
              type: Sequelize.BOOLEAN,
              defaultValue: false
          }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      return queryInterface.dropTable('Users');
  }
};
