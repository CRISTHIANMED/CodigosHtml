document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (email === "admin@example.com" && password === "1234") {
        window.location.href = "index.html";
    } else {
        alert("Credenciales incorrectas, intente nuevamente.");
    }
});