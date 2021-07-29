const passport = require ('passport');


exports.autenticarUsuario = passport.authenticate('local',{
   successRedirect:'/',
   failureRedirect:'/iniciar-sesion',
   failureFlash:true,
   badRequestMessage: 'Ambos campos son obligatorios'
});


//funvcion para revisar si el usaurio esta loguerado

exports.usuarioAutenticado = (req,res,next) =>{


    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/iniciar-sesion');

}

exports.cerrarSesion = (req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion')
    })
}