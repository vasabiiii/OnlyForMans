'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Companies',{
      id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

    },
    description: {
      type: Sequelize.STRING,
        allowNull: false,
       

    },
    logo: {
      type: Sequelize.STRING,
        allowNull: false,
        unique: true

    },

    address: {
      type: Sequelize.STRING,
        allowNull: false,
        unique: true

    },
    // updatedAt:{
    //   allowNull: false,
    //   type:Sequelize.Date
    // }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies',{})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
