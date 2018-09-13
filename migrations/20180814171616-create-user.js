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
          firstName: {
              type: Sequelize.STRING(50)
          },
          lastName: {
              type: Sequelize.STRING(50)
          },
          username: {
              type: Sequelize.STRING(50)
          },
          password: {
              type: Sequelize.STRING(50)
          },
          dateBirth: {
              allowNull: false,
              type: Sequelize.DATE
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
