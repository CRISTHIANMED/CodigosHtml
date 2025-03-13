//const saludo = require("./saludo.js") // Importamos todos los recursos del módulo saludo.js

//console.log(saludo.saludar("Cristhian"));
//console.log(saludo.saludarHolaMundo());
//console.log(saludo.saludar("Esteban"));


const {saludar, saludarHolaMundo} = require("./saludo.js") // Importamos todos los recursos del módulo saludo.js

console.log(saludar("Cristhian"));
console.log(saludarHolaMundo());
console.log(saludar("Esteban"));

