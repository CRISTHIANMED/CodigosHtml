for (let i=0; i<=5; i++) {
    console.log("iteración for número: " + i)
}

let contador = 0;
while (contador<5) {
    console.log("iteración while número: " + contador)
    contador ++;
}

let numero = 0;
do {
    console.log("iteración do-while número: " + numero)
    numero ++;
} while (numero < 5);

let frutas = ["Manzana", "Banana", "Cereza"];
for (let fruta of frutas) {
    console.log("fruta " + fruta);
}

let persona = {
    nombre : "Juan",
    edad : 25,
    ciudad: "Bogotá"
};

for (let key in persona) {
    console.log(key + ": " + persona[key]);
}