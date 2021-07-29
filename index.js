const express          = require ("express");
const path             = require("path");
const bodyParser       = require("body-parser");
const expressValidator = require("express-validator");
const flash = require ('connect-flash');
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// Import Own Components
const routes  = require("./routes");
const helpers = require("./helpers");
const db      = require("./config/db");

const port = 3000;

//importar modelo
require("./models/Pacientes");
require("./models/Expedientes");

db.sync()
    .then(() => console.log("Conectado a la base de datos"))
    .catch(error => console.log(error));

const app = express();

app.use(express.static("public"));

// habilitar pug
app.set("view engine","pug");

app.use(bodyParser.urlencoded({ extended : true }));




app.listen(port, () => console.log(`[Server] Listening on port ${port}`));



//añadir carpeta vistas
app.set("views", path.join(__dirname, "./views"));

//sesiobes bos permiten navegar entre distintas paginas sin volver a utentificar

app.use(flash());

app.use(cookieParser());
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUnitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

// ásar vadump a la app
app.use((req,res, next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    //console.log(res.locals.usuario);
    next();
});


app.use("/", routes());
