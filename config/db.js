const Sequelize = require("sequelize");

const db = new Sequelize("SistemaClinico", "admin", "IsaacE97", {
	host             : "localhost",
	dialect          : "mysql",
	port             : "3306",
	operatorsAliases : false,
	define           : {
		timestamps : false
	},
	pool : {
		max     : 5,
		min     : 0,
		acquire : 30000,
		idle    : 10000
	},
});

module.exports = db;
