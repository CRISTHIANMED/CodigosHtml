let numeros = [];
let index = 0;
let pares = 0;
let impares = 0;
let numero;

do {
    numero = parseInt(prompt("Ingrese un número:"));

    if (isNaN(numero)) {
        alert("Valor no numérico detectado. Terminando entrada de datos.");
        break;
    }

    numeros[index] = numero;
    index++; // Aumentar índice

    // Contar pares e impares
    if (numero % 2 === 0) {
        pares++;
    } else {
        impares++;
    }

} while (numero != 0);

// Mostrar resultados
alert("Números ingresados: [" + numeros + "]");
alert("Cantidad de números pares: " + pares + " / Cantidad de números imapres: " + impares);
