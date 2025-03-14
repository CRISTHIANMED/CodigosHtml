//console.log(process); // Imprime un objeto con información del proceso actual
//console.log(process.env); // Imprime un objeto con información del entorno de ejecución
console.log(process.argv[1]); // Imprime un arreglo con los argumentos de la línea de comandos

for (let i = 0; i < process.argv.length; i++) {
    console.log(`Argumento ${i}: ${process.argv[i]}`);
}