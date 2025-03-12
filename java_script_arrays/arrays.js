const nombres = ["David", "Juan", "Kevin"]

for (let i = 0; i < nombres.length; i++) {
    console.log(nombres[i]);
}

nombres.push("Carlos") //inserta un valor al final del arreglo
console.log(nombres);

nombres.unshift("Agustin") //inserta un valor al inicio del arreglo
console.log(nombres);

let final = nombres.pop() // eliminar ultimo elemto del arreglo
console.log(final)

let inicio = nombres.shift() // elimina el primer elemento del arreglo
console.log(inicio)


