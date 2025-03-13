function saludar(nombre) {
    return `hola, ${nombre}`;
}

function saludarHolaMundo() {
    return "Hola Mundo !";
}

//module.exports.saludo = saludar;
//module.exports.Mundo = saludarHolaMundo;

module.exports = {
    saludo: saludar,
    mundo: saludarHolaMundo
}
