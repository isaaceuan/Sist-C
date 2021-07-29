const Usuarios = require('../models/Usuarios');
exports.formCrearCuenta =(req, res) => {
    res.render('crearCuenta',{
        nombrePagina:'Crear cuenta'
    })
}

exports.formIniciarSesion =(req, res) => {
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina:'Iniciar Sesion',
        error
    })
}

exports.crearCuenta =async (req,res) => {
    //lee los datos
        const {email, password} = req.body;

            try {
                    //crear usuarios
                await Usuarios.create({email,password})
            } catch (error){
                req.flash('error', error.errors.map(error => error.message));
                res.render('crearCuenta',{
                    mensajes:req.flash(),
                    nombrePagina:'crear cuenta en kurando',
                    email,
                    password
                })
            }
           res.redirect('/iniciar-sesion')
    
          

         
}