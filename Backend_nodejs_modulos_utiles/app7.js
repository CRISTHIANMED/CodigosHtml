function mostrarTema(tema) {
    console.log(`Estoy aprendiendo ${tema}`);
}

console.log('Antes de llamar a la función setImmediate'); // evento sincrono
setImmediate(mostrarTema, 'Node.js'); // Evento asincrono llama a la función después de que el procesos sincrono haya terminado
console.log('Despues de llamar a la función setImmediate'); // evento sincrono