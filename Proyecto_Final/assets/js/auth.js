document.addEventListener("DOMContentLoaded", function() { 
    // Espera a que todo el contenido del DOM haya sido cargado antes de ejecutar el script.
    
    const token = sessionStorage.getItem("token"); 
    // Obtiene el token almacenado en la sesión del navegador.
    
    if (!token) { 
        // Verifica si no existe un token almacenado.
        
        alert("Debes iniciar sesión para acceder a esta página."); 
        // Muestra un mensaje de alerta indicando que el usuario debe iniciar sesión.
        
        window.location.href = "login.html"; 
        // Redirige al usuario a la página de inicio de sesión.
    }
});

