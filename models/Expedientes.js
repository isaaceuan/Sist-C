const Sequelize = require ("sequelize");

// Import Own Components
const db        = require ("../config/db");
const Pacientes = require ("./Pacientes");


const Expedientes = db.define("expedientes",{
    id : {
        type          :Sequelize.INTEGER,
        primaryKey    : true,
        autoIncrement : true,
    },
    expediente  : Sequelize.STRING(100),
    peso        : Sequelize.STRING(50),
    talla       : Sequelize.STRING(100),
    edad        : Sequelize.STRING(10),
    presionArt  : Sequelize.STRING(50),
    temperatura : Sequelize.STRING(50),
    frecResp    : Sequelize.STRING(50),
    frecCard    : Sequelize.STRING(50),
    historial   : Sequelize.STRING,
    urlfile     : Sequelize.STRING,

});

Expedientes.belongsTo(Pacientes);

module.exports = Expedientes;
