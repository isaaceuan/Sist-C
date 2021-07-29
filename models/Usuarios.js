const Sequelize = require('sequelize');
const db= require('../config/db');
const Pacientes = require('../models/Pacientes')
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');


const Usuarios = db.define('usuarios',{
    id :{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    email: {
        type:Sequelize.STRING(60),
        allowNull: false,
        validate:{
            isEmail :{
                msg: 'Agrega un correo valido'
            },
            notEmpty:{
                msg:'el correo no puede ir vacio'
            }
        },
        unique:{
            args:true,
            msg:'usuario ya registrado'

        }

    },
    password: {
        type:Sequelize.STRING(60),
        allNull : false,
        validate: {
            notEmpty:{
                msg:'el password no puede ir vacio'
            }
        }
    }
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});


// meotodos personalizados
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
Usuarios.hasMany(Pacientes);

module.exports = Usuarios;