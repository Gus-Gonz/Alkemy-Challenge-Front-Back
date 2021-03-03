const Sequelize = require("sequelize");

const sequelize = require("../util/database");

/* Creamos nuestro modelo de operaciones con el tipo de 
datos requerido y su llave primaria para poder identificar
cada operación univocamente */

const Operation = sequelize.define(
  "operation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    concept: Sequelize.STRING,
    value: Sequelize.FLOAT,
    date: Sequelize.DATEONLY,
    isIncome: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "operation",
    classMethods: {},
  }
);

module.exports = Operation;
