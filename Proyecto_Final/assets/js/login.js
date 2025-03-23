document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.userId); // Guardar ID del usuario
            sessionStorage.setItem("user", JSON.stringify(data.user)); // Guardar como string

            alert("Inicio de sesión exitoso.");
            window.location.href = "resume.html"; // Redirigir al panel principal
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Error en el servidor.");
    }
});
