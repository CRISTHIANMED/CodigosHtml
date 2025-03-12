const persona = {
    nombre: "Juan Perez",
    edad: 25,
    comidafavorita: "hamburguesa"
};

let edad = persona.edad;
persona.edad = 30;
console.log(edad);

persona.comidafavorita = "pizza";
console.log(persona.comidafavorita);

persona.deporte = "futbol";
console.log(persona);

delete persona.comidafavorita
console.log(persona);


for (const key in persona) {
    console.log( key + ": " + persona[key])
}


