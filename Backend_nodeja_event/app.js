const EventEmiter = require('events');

const emisorProductos = new EventEmiter();

emisorProductos.on('Compra', (total, productos) => {
    console.log(`Se realizo una compra por un total de: ${total}`);
    console.log(`El numero de productos es de : ${productos}`);
}); 

emisorProductos.emit('Compra', 500, 5);
