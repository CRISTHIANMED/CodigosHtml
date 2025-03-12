function ejercicio_1() {
    //var nom = prompt("Ingrese su nombre");
    var num1 = parseInt(prompt("Ingrese el numero 1"));
    var num2 = parseInt(prompt("Ingrese el numero 2"));
    var num3 = parseInt(prompt("Ingrese el numero 3"));

    // Inicializar las variables mayor y menor
    let mayor = num1;
    let menor = num1;

    // Determinar el mayor
    if (num2 > mayor) {
        mayor = num2;
    }
    if (num3 > mayor) {
        mayor = num3;
    }

    // Determinar el menor
    if (num2 < menor) {
        menor = num2;
    }
    if (num3 < menor) {
        menor = num3;
    }

    alert("El número mayor es: " + mayor + "\n" + "El número menor es: " + menor);
}

function ejercicio_2() {
    // Solicitar al usuario el tipo de menú
    let menu = prompt("Elija su menú: carne, pescado o verdura").toLowerCase();

    // Variable para almacenar la bebida sugerida
    let bebida;

    if (menu === "carne") {
        bebida = "vino tinto";
    } else if (menu === "pescado") {
        bebida = "vino blanco";
    } else if (menu === "verdura") {
        bebida = "agua";
    } else {
        bebida = "Elija carne, pescado o verdura.";
    }

    // Mostrar el resultado
    alert("La bedida ofrecida es: " + bebida);
}

function ejercicio_3() {
    // Solicitar al usuario un número entero
    let numero = parseInt(prompt("Ingrese un número entero:"));

    let resultado = "";

    // Generar la lista de números con un bucle for
    for (let i = 0; i <= numero; i++) {
        resultado += i;
        if (i < numero) {
            resultado += ", ";
        }
    }

    // Mostrar el resultado
    alert(resultado);


}

function ejercicio_4() {
    // Solicitar al usuario un número entero
    let numero = parseInt(prompt("Ingrese un número entero:"));
    let i = 0;
    let resultado = "";

    // Bucle while para generar la lista de números
    while (i <= numero) {
        resultado += i;
        if (i < numero) {
            resultado += ", ";
        }
        i++;
    }

    // Mostrar el resultado con alert
    alert(resultado);

}

function ejercicio_5() {
    let letra;

    do {
        letra = prompt("Por favor, ingrese la letra 'A' (en mayúscula):");
    } while (letra !== "A");

    alert("¡Gracias! Ingresaste la letra correcta.");
}