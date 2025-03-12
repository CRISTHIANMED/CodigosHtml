function miFuncion() {
    alert('Hola Mundo') //Esto es un comentario
}

function tipoDeVariable() {
    var a = 2;
    var text = "Hola";
    var vBool = true;

    alert(typeof a);
    alert(typeof text);
    alert(typeof vBool);
    alert(typeof x);
}

function operadores() {
    var num1 = 20;
    var num2 = 15;

    suma = num1 + num2;
    resta = num1 - num2;
    multiplicacion = num1 * num2;
    division = num1 / num2;
    modulo = num1 % num2;

    alert("La suma es: " + suma);
    alert("La resta es: " + resta);
    alert("La multiplicacion es: " + multiplicacion);
    alert("La division es: " + division);
    alert("La modulo es: " + modulo);

    alert("La suma es: " + modulo + " La resta es: " + resta);
}

function nombre(){
    //var nom = prompt("Ingrese su nombre");
    var num1 = parseInt(prompt("Ingrese el numero 1"));
    var num2 = parseInt(prompt("Ingrese el numero 2"));

    suma = num1 + num2;
    resta = num1 - num2;
    multiplicacion = num1 * num2;
    division = num1 / num2;
    modulo = num1 % num2;

    alert('La suma de ' + num1 + ' y ' + num2 + ' es: ' + suma);
    alert('La resta de ' + num1 + ' y ' + num2 + ' es: ' + resta);
    alert('La multiplicacion de ' + num1 + ' y ' + num2 + ' es: ' + multiplicacion);
    alert('La division de ' + num1 + ' y ' + num2 + ' es: ' + division);
    alert('La modulo de ' + num1 + ' y ' + num2 + ' es: ' + modulo);
}

function condicional(){
    let numero = parseInt(prompt("Ingrese el numero"));
    if(numero > 5){
        alert("El número "+ numero + " es mayor que 5")
    }
    else if( numero = 5){
        alert("El número "+ numero + " es igual que 5")
    }
    else{
        alert("El número "+ numero + " es menor que 5")
    }
}

function edad(){
    let numero = parseInt(prompt("Ingrese ela edad"));
    if(numero < 13){
        alert("Es un niño")
    }
    else if( numero < 18){
        alert("Es un adolecente")
    }
    else if( numero < 65){
        alert("Es un adulto")
    }
    else{
        alert("Es un adulto mayor")
    }
}