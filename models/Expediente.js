const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Expediente = sequelize.define('Expediente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Expediente;