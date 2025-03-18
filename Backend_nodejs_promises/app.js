const promesaCumplida = false;


const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (promesaCumplida) {
            resolve('La promesa cumplida...');
        } else {
            reject('La promesa rechazada...');
        }
    }, 2000);
});

miPromesa.then((mensaje) => {
    console.log(mensaje);
}).catch((mensaje) => {
    console.log(mensaje);
});

const manejarPromesaCumplida = (valor => {
    console.log(valor);
});

const manejarPromesaRechazada = (razonRechazo => {
    console.log(razonRechazo);
});

miPromesa.then(manejarPromesaCumplida, manejarPromesaRechazada);