const passport = require ( 'passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');



passport.use (
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email,password, done) =>{
            try{
                const usuario = await Usuarios.findOne({
                    where: {email:email}
                });
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'password incorrecto'
                    })

                }

                return done(null,usuario);
            } catch (error){
                //ese usurio no exiaste
                return done(null,false,{
                   message : 'esa cuenta no existe'
                })
            }
        }
    )
);

//serializar el usuario
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
});

passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
});

module.exports =passport;
