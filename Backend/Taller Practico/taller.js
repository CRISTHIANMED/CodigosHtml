// Retorna el nombre y la edad como un objeto
function nombreEdad(nombre, edad) {
    return `hola, soy ${nombre} y mi edad es ${edad}`;
}

// Suma dos números
function sumarNumeros(a, b) {
    return `La suma de ${a} y ${b} es ${a + b}`;
}

// Retorna el cuadrado de un número
function cuadradoNumero(num) {
    return `El cuadrado de ${num} es ${num * num}`;
}

// Exportar las funciones para su uso en otros módulos
module.exports = {
    nombreEdad,
    sumarNumeros,
    cuadradoNumero
};