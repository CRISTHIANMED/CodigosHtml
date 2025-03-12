const semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

let dia = parseInt(prompt("Ingrese un numero"));

if (dia>=0 && dia<=6){
    for (i in semana) {
        if(dia == i){
            alert("El dia elegigo es el : " + semana[i]);
        }
    }
} else{
    alert("Número invalido, rango entre 0 y 6")
}
