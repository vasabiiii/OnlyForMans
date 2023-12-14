const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const Resume = require('./Resume')
const EmploymentType = require("../../employment-type/EmploymentType");

const ResumeEmploymentType = sequelize.define('ResumeEmploymentType', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

},{
  timestamps: false,
});

Resume.belongsToMany(EmploymentType, { through: 'ResumeEmploymentType',
foreignKey: 'resumeId', otherKey: 'employmentTypeId', as: "employmentTypes" });
EmploymentType.belongsToMany(Resume, { through: 'ResumeEmploymentType',
foreignKey: 'employmentTypeId', otherKey: 'resumeId' });

module.exports = ResumeEmploymentType;
