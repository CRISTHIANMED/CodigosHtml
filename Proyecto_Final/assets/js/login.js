document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token en localStorage
        localStorage.setItem("userId", data.id); // Guardar el ID del usuario
        alert("Inicio de sesión exitoso.");
        window.location.href = "resume.html";
    } else {
        alert(data.message);
    }
});