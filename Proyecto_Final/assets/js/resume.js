document.addEventListener("DOMContentLoaded", async function() {  
    // Espera a que el contenido de la página esté completamente cargado antes de ejecutar el código.

    const token = sessionStorage.getItem("token");  
    const userId = sessionStorage.getItem("userId");  
    // Obtiene el token de autenticación y el ID del usuario almacenados en la sesión.

    if (!token) {  
        // Si no hay un token o un ID de usuario, significa que el usuario no ha iniciado sesión.

        window.location.href = "login.html";  
        // Redirige al usuario a la página de inicio de sesión.

        return;  
        // Detiene la ejecución del script.
    }

    try {  
        // Intenta obtener los movimientos financieros del usuario autenticado.

        const response = await fetch(`http://localhost:3000/movements`, {  
            // Realiza una solicitud GET al servidor para obtener los movimientos del usuario.

            method: "GET",  
            headers: { Authorization: `Bearer ${token}` }  
            // Envía el token en la cabecera para autenticar la solicitud.
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);  
        // Si la respuesta del servidor no es exitosa, lanza un error con el código de estado.

        const data = await response.json();  
        // Convierte la respuesta en un objeto JSON.

        if (!Array.isArray(data)) throw new Error("Respuesta del servidor no válida.");  
        // Verifica que la respuesta sea un arreglo, si no, lanza un error.

        let saldoTotal = 0;  
        let ingresos = 0;  
        let gastos = 0;  
        // Variables para calcular el saldo total, ingresos y gastos.

        let listaMovimientos = document.getElementById("lista-movimientos");  
        listaMovimientos.innerHTML = "";  
        // Obtiene el elemento HTML donde se mostrarán los movimientos y lo limpia.

        data.forEach(mov => {  
            // Recorre cada movimiento recibido en la respuesta del servidor.

            let monto = parseFloat(mov.monto);  
            let tipo = mov.tipo;  
            // Obtiene el monto y el tipo del movimiento (Ingreso o Gasto).

            if (tipo === "Ingreso") {  
                ingresos += monto;  
            } else if (tipo === "Gasto") {  
                gastos += monto;  
            }  
            // Suma los montos según su tipo.

            saldoTotal += (tipo === "Ingreso") ? monto : -monto;  
            // Calcula el saldo total: suma ingresos y resta gastos.

            let li = document.createElement("li");  
            // Crea un nuevo elemento <li> para mostrar el movimiento.

            li.className = `list-group-item ${tipo === "Ingreso" ? "text-success fw-bold" : "text-danger fw-bold"}`;  
            // Asigna una clase CSS para cambiar el color del texto según el tipo (verde para ingresos, rojo para gastos).

            li.innerText = `${tipo}: $${monto.toFixed(2)}`;  
            // Establece el texto del <li> con el tipo de movimiento y su monto formateado con dos decimales.

            listaMovimientos.appendChild(li);  
            // Agrega el <li> a la lista de movimientos en la página.
        });

        document.getElementById("saldo-total").innerText = `$${saldoTotal.toFixed(2)}`;  
        // Muestra el saldo total actualizado en la interfaz.

        generarGrafico(ingresos, gastos);  
        // Llama a la función que genera un gráfico de barras con los ingresos y gastos.

    } catch (error) {  
        console.error("Error cargando los movimientos:", error);  
        // Captura y muestra en la consola cualquier error ocurrido durante la ejecución.
    }  
});

function generarGrafico(ingresos, gastos) {  
    // Función para generar un gráfico de barras con los ingresos y gastos.

    const ctx = document.getElementById("graficoMovimientos").getContext("2d");  
    // Obtiene el contexto del canvas donde se dibujará el gráfico.

    new Chart(ctx, {  
        // Crea un nuevo gráfico utilizando la biblioteca Chart.js.

        type: "bar",  
        // Especifica que el tipo de gráfico es de barras.

        data: {  
            labels: ["Ingresos", "Gastos"],  
            // Etiquetas para el gráfico.

            datasets: [{  
                label: "Cantidad en COP",  
                data: [ingresos, gastos],  
                // Datos para las barras: ingresos y gastos.

                backgroundColor: ["#198754", "#dc3545"],  
                // Colores de fondo: verde para ingresos, rojo para gastos.

                borderColor: ["#145c3d", "#a32a2a"],  
                // Colores del borde de las barras.

                borderWidth: 1  
                // Grosor del borde de las barras.
            }]  
        },  

        options: {  
            responsive: true,  
            // Hace que el gráfico se adapte al tamaño de la pantalla.

            scales: {  
                y: { beginAtZero: true }  
                // Configura el eje Y para que comience desde cero.
            }  
        }  
    });  
}
