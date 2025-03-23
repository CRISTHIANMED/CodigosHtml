document.getElementById("loginForm").addEventListener("submit", async function(event) {
    // Agrega un evento al formulario con el ID "loginForm" que se ejecuta cuando se envía.
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Obtiene los valores ingresados en los campos de email y contraseña.

    try {
        const response = await fetch("http://localhost:3000/login", {
            // Realiza una solicitud HTTP POST al servidor en la ruta "/login".

            method: "POST", 
            headers: { "Content-Type": "application/json" },
            // Especifica que el contenido enviado es de tipo JSON.

            body: JSON.stringify({ email, password })
            // Convierte los datos de email y contraseña a formato JSON y los envía en el cuerpo de la solicitud.
        });

        const data = await response.json();
        // Espera la respuesta del servidor y la convierte en un objeto JavaScript.

        if (response.ok) {
            // Si la respuesta es exitosa (código de estado 200-299):

            sessionStorage.setItem("token", data.token);
            // Almacena el token de autenticación en el almacenamiento de sesión.

            sessionStorage.setItem("userId", data.userId);
            // Almacena el ID del usuario en el almacenamiento de sesión.

            sessionStorage.setItem("user", JSON.stringify(data.user));
            // Almacena la información completa del usuario en formato JSON como cadena de texto.

            alert("Inicio de sesión exitoso.");
            window.location.href = "resume.html";
            // Muestra una alerta de éxito y redirige al usuario a la página principal.
        } else {
            alert(data.message);
            // Si el inicio de sesión falla, muestra un mensaje de error devuelto por el servidor.
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Error en el servidor.");
        // Captura errores de red o del servidor y muestra un mensaje de error.
    }
});
