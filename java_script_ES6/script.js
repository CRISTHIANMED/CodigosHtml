const persona = {
    nombre: 'Juan',
    mensaje: `Hola, 
    esto es un mensaje
    en varias líneas`,
    edad: 25,
    saludar: function () {
        setTimeout(() => {
            console.log("Hola, soy " + this.nombre + " y mi edad es " + this.edad); 
            console.log(`Hola, soy ${this.nombre} y mi edad es ${this.edad}`); 
            console.log(this.mensaje);
        }, 1000);
    }
}

persona.saludar();