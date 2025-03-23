// Agrega un evento al formulario de registro para manejar el envío de datos
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario

    // Obtiene los valores ingresados en los campos del formulario
    const nombre = document.getElementById("name").value;
    const apellido = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verifica que las contraseñas coincidan antes de enviar la solicitud
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden."); // Muestra una alerta si las contraseñas son diferentes
        return; // Detiene la ejecución de la función
    }

    try {
        // Realiza una solicitud POST al servidor para registrar al usuario
        const response = await fetch("http://localhost:3000/register", {
            method: "POST", // Método HTTP utilizado
            headers: {
                "Content-Type": "application/json" // Indica que se enviará JSON en el cuerpo de la solicitud
            },
            body: JSON.stringify({ nombre, apellido, email, password }) // Convierte los datos a formato JSON
        });

        const result = await response.json(); // Convierte la respuesta del servidor a un objeto JavaScript

        if (response.ok) {
            alert(result.message); // Muestra un mensaje de éxito
            window.location.href = "login.html"; // Redirige al usuario a la página de inicio de sesión
        } else {
            alert(result.message); // Muestra un mensaje de error si la solicitud falla
        }

    } catch (error) {
        console.error("Error:", error); // Muestra el error en la consola
        alert("Ocurrió un error al registrar el usuario."); // Alerta en caso de fallo en la solicitud
    }
});
