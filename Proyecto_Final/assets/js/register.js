document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("name").value;
    const apellido = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }


    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, apellido, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = "login.html";
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al registrar el usuario.");
    }
});