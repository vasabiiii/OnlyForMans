'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Specializations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specializationTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SpecializationTypes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Specializations');
  },
};