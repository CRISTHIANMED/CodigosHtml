document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");
    
    if (!navbarContainer) {
        console.error("Error: No se encontró el navbar-container en el HTML.");
        return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    console.log("Verificando sesión...");
    console.log("Usuario en sesión:", user);
    console.log("Token en sesión:", token);

    if (user && token) {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Gestión de Finanzas</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="resume.html">Resumen</a></li>
                            <li class="nav-item"><a class="nav-link" href="movements.html">Movimientos</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown">
                                    <span class="badge bg-light text-dark">${user.nombre} ${user.apellido}</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" id="logout">Cerrar Sesión</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Evento para cerrar sesión
        document.getElementById("logout").addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "index.html";
        });

    } else {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Gestión de Finanzas</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="login.html">Iniciar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
});
