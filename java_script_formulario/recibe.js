document.getElementById("formulario").addEventListener("submit",
    function (event) {
        //Evita que se recargue la página por defecto
        event.preventDefault(); 
        //obtener los valores de cada casilla o elemto del formulario
        let nombre = document.getElementById("nombre").value;
        let sexo = document.querySelector('input[name="sexo"]:checked').value;
        let edad = document.getElementById("edad").value;
        let termino = document.getElementById("terminos").value
        alert(nombre + ' ' + sexo  + ' ' + termino + ' ' + edad);
    }
);