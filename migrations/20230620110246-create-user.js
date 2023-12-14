'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:Sequelize.INTEGER
      },
      email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
      type:Sequelize.STRING,
        allowNull: true
    },
    phone: {
      type:Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    full_name: {
      type:Sequelize.STRING,
        allowNull: true
    },
    roleId:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'Roles',
        key:'id'
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE",
    },
    companyId:{
      type:Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:'Companies', 
        key:'id'
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE",
    }
    
  
    })
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User',{})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
