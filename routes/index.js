const express  = require("express");
const router   = express.Router();
const { body } = require("express-validator/check");

// Import Models
const Expedientes = require("../models/Expedientes");

// Import Controllers
const clinicaControllers    = require("../controllers/clinicaControllers");
const expedienteControllers = require("../controllers/expedienteControllers");
const usuariosControllers = require("../controllers/usuariosControllers");
const authController = require('../controllers/authController');

module.exports = function() {
    router.get("/",
    
    authController.usuarioAutenticado,
    clinicaControllers.clinicaHome
    );
    router.get("/nuevo-paciente", 
    authController.usuarioAutenticado,
    clinicaControllers.formularioPaciente
    );
    router.post("/nuevo-paciente",
    authController.usuarioAutenticado,
        body("nombre").not().isEmpty().trim().escape(),
    clinicaControllers.nuevoPaciente);
    //listar proycto
    router.get("/pacientes/:url", 
    authController.usuarioAutenticado,
    clinicaControllers.pacientePorUrl);

    //actualizar proyecto
    router.get("/pacientes/editar/:id",
    authController.usuarioAutenticado,
    clinicaControllers.formularioEditar
    );
    router.post("/nuevo-paciente/:id",
    authController.usuarioAutenticado,
        body("nombre").not().isEmpty().trim().escape(),
    clinicaControllers.actualizarPaciente);
    
    //eliminar proyecto
    router.delete("/pacientes/:url",
    authController.usuarioAutenticado,
    clinicaControllers.eliminarPaciente);

    
    router.post("/pacientes/:url",
    authController.usuarioAutenticado,
    expedienteControllers.uploadfile,expedienteControllers.agregarExpediente);

    //eliminar expediente

    router.delete("/expedientes/:id",
    authController.usuarioAutenticado,
    expedienteControllers.eleminarExpediente);
    
    router.get("/crear-cuenta",usuariosControllers.formCrearCuenta)
    router.post('/crear-cuenta',usuariosControllers.crearCuenta)
    router.get('/iniciar-sesion',usuariosControllers.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario)    
    router.get('/cerrar-sesion',authController.cerrarSesion)
    return router;

    //iniciar sesion

};

//`/pacientes/${paciente.url}`