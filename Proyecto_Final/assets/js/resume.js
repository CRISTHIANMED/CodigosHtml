document.addEventListener("DOMContentLoaded", async function() {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    if (!token || !userId) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = "login.html";
        return;
    }

    try {
        // Filtramos movimientos por el usuario logeado
        const response = await fetch(`http://localhost:3000/movements?userId=${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Respuesta del servidor no válida.");

        let saldoTotal = 0;
        let ingresos = 0;
        let gastos = 0;
        let listaMovimientos = document.getElementById("lista-movimientos");
        listaMovimientos.innerHTML = "";

        data.forEach(mov => {
            let monto = parseFloat(mov.monto);
            let tipo = mov.tipo;

            if (tipo === "Ingreso") {
                ingresos += monto;
            } else if (tipo === "Gasto") {
                gastos += monto;
            }
            
            saldoTotal += (tipo === "Ingreso") ? monto : -monto;

            let li = document.createElement("li");
            li.className = `list-group-item ${tipo === "Ingreso" ? "text-success fw-bold" : "text-danger fw-bold"}`;
            li.innerText = `${tipo}: $${monto.toFixed(2)}`;
            listaMovimientos.appendChild(li);
        });

        document.getElementById("saldo-total").innerText = `$${saldoTotal.toFixed(2)}`;
        generarGrafico(ingresos, gastos);

    } catch (error) {
        console.error("Error cargando los movimientos:", error);
    }
});

function generarGrafico(ingresos, gastos) {
    const ctx = document.getElementById("graficoMovimientos").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Ingresos", "Gastos"],
            datasets: [{
                label: "Cantidad en COP",
                data: [ingresos, gastos],
                backgroundColor: ["#198754", "#dc3545"], // Verde para ingresos, rojo para gastos
                borderColor: ["#145c3d", "#a32a2a"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
