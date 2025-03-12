document.getElementById("form-calc").addEventListener("submit", function(event) {
    event.preventDefault();
});

function calcular(operacion) {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let resultado;

    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor ingrese números válidos");
        return;
    }

    switch (operacion) {
        case 'suma':
            resultado = numero1 + numero2;
            break;
        case 'resta':
            resultado = numero1 - numero2;
            break;
        case 'multiplicacion':
            resultado = numero1 * numero2;
            break;
        case 'division':
            if (numero2 === 0) {
                alert("No se puede dividir por cero");
                return;
            }
            resultado = numero1 / numero2;
            break;
        case 'modulo':
            if (numero2 === 0) {
                alert("No se puede calcular el módulo con divisor cero");
                return;
            }
            resultado = numero1 % numero2;
            break;
        default:
            alert("Operación no válida");
            return;
    }

    alert("El resultado es: " + resultado);
}