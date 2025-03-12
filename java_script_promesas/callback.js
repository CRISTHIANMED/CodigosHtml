const isTiendaTelefono = true;
const isTiendaTelefonoDisponible = true;

function porcesarMensaje (resolveCallback, rejectCallback){

    if(!isTiendaTelefono){
        rejectCallback({
            name: 'Comida china',
            messge: 'lo siento este es un restaurante de comida china'
        });
    }
    else if(!isTiendaTelefonoDisponible){
        rejectCallback({
            name: 'No hay disponibles',
            messge: 'lo sentimos no tenemos telefonos disponibles'
        });
    }
    else{
        resolveCallback({
            name: 'OK',
            messge: 'telefono solicitado disponible, cuantos desea'
        });
    }
}

porcesarMensaje(
    value => console.log(value),
    reason => console.log(reason)
);
