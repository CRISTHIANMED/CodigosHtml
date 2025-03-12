const esTiendaTelefonos = true;
const telefonoDisponible = true;


function procesarMEnsaje() {
    return new Promise((resolve, reject) => {
        if (!esTiendaTelefonos) {
            reject({
                name: 'es un restaurante chino',
                message: 'lo siento este es un restaurante'
            });
        } else if (!telefonoDisponible) {
            reject({
                name: 'Telefoonos no disponibles',
                message: 'Lo sentimos el telefono solicitado agotado'
            });
        }
        else {
            resolve({
                name: 'OK',
                message: 'telefono solicitado disponible, cuantos desea ordenar'
            });
        }
    });
}

procesarMEnsaje()
    .then(response => console.log(response))
    .catch(error => console.log(error));

