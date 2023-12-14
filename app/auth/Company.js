const {DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    }

},{
    timestamps:false,})


module.exports = Company;
