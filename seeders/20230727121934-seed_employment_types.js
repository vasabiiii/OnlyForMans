'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('EmploymentTypes', [
      { name: 'Полная занятость' },
      { name: 'Частичная занятость' },
      { name: 'Проектная работа' },
      { name: 'Волонтерство' },
      { name: 'Стажировка' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmploymentTypes', null, {});
  }
};