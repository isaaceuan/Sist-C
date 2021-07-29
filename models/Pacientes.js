const Sequelize = require("sequelize");
const slug      = require("slug");
const shortid   = require("shortid");

// Import Own Components
const db = require("../config/db");

const Pacientes = db.define("pacientes", {
    id : {
        type          : Sequelize.INTEGER,
        primaryKey    : true,
        autoIncrement : true,
    },
    nombre : Sequelize.STRING(100),
	url    : Sequelize.STRING(100),
}, {
    hooks : {
        beforeCreate : (pacientes) => {
            const url     = slug(pacientes.nombre).toLowerCase();   
            pacientes.url = `${url}-${shortid.generate()}`;
        },
    },
});

module.exports = Pacientes;
