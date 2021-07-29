const Pacientes   = require("../models/Pacientes");
const Expedientes = require("../models/Expedientes")

exports.clinicaHome = async (req, res)=>{


    const usuarioId = res.locals.usuario.id;
    const pacientes = await Pacientes.findAll({where: { usuarioId  }});

    res.render("index",{
        nombrePagina : "Sistema Clinico",
        pacientes,
    });
};

exports.formularioPaciente = async (req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const pacientes =  await Pacientes.findAll({where:{usuarioId}});

    res.render("nuevoPaciente", {
        nombrePagina : "Nuevo paciente",
        pacientes
    })
};

exports.nuevoPaciente =  async (req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const pacientes =  await Pacientes.findAll({where:{usuarioId}});

    //enviar a la consola lo que el usuairio escriba

   // console.log(req.body)

   //validar que tengamos algo en el imput

   const { nombre } = req.body;

   let errores = [];

   if(!nombre) {
       errores.push({"texto": "agregar algo al paciente"})
   }

   if(errores.length>0) {
       res.render("nuevoPaciente", {
           nombrePagina : "Nuevo Paciente",
           errores,
           pacientes,
       });
   } else{
       //no hay errores
       //insertar en la BD
      const usuarioId = res.locals.usuario.id;
       await Pacientes.create({nombre,usuarioId});
       res.redirect("/")
   }
};

exports.pacientePorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const pacientesPromise =  Pacientes.findAll({where:{usuarioId}});
    const pacientePromise  = Pacientes.findOne({
        where : {
            url : req.params.url,
            usuarioId
        },
	});

    const [pacientes, paciente] = await Promise.all([pacientesPromise,pacientePromise]);

    //consultar tareas del proyecto atual

    const expedientes = await Expedientes.findAll({
        where : {
            pacienteId : paciente.id
        },
    });

	console.log(expedientes);

	if(!paciente) return next();

	// render a la vista
	res.render("expedientes", {
		nombrePagina : "Expediente del paciente",
		paciente,
		pacientes,
		expedientes
	})
}
exports.formularioEditar = async(req,res) =>{
    const usuarioId = res.locals.usuario.id;
    const pacientesPromise =  Pacientes.findAll({where:{usuarioId}});
    const pacientePromise =  Pacientes.findOne({
        where:{
            id:req.params.id,
            usuarioId
        }
    });
    const [pacientes, paciente]= await Promise.all([pacientesPromise,pacientePromise]);

    res.render("nuevoPaciente",{
        nombrePagina:"Editar Paciente",
        pacientes,
        paciente
    })
}

exports.actualizarPaciente = async(req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const pacientes =  await Pacientes.findAll({where:{usuarioId}});

	//enviar a la consola lo que el usuairio scriiba

	// console.log(req.body)

	//validar que tengamos algo en el imput

	const {nombre} = req.body;

	let errores = [];

	if(!nombre) {
		errores.push({"texto": "agregar algo al paciente"})
	}

	if(errores.length>0) {
		res.render("nuevoPaciente",{
			nombrePagina : "Nuevo Paciente",
			errores,
			pacientes
		})
	} else{
		//no hay errores
		//insertar en la BD
		await Pacientes.update(
			{nombre:nombre},
			{where: {id:req.params.id}}
			);
		res.redirect("/")
	}
}

exports.eliminarPaciente = async (req,res,next)=>{
    //req, quey o params

    const {urlPaciente} = req.query;
    const resultado = await Pacientes.destroy({where: {url: urlPaciente}});

    if(!resultado){
        return next();
    }
    res.send("Paciente eliminado correctamente");

}
