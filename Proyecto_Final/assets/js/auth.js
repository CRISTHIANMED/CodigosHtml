document.addEventListener("DOMContentLoaded", function() {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = "login.html";
    }
});


