let isEditing = false;
let editingId = null;

document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
        window.location.href = "login.html";
    } else {
        loadMovements();
    }
});

// Función para cargar movimientos
async function loadMovements() {
    const token = sessionStorage.getItem("token");
    if (!token) return console.error("Token de autenticación no encontrado.");

    try {
        const response = await fetch("http://localhost:3000/movements", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        const tableBody = document.getElementById("movementsTableBody");

        if (!tableBody) return console.error("No se encontró la tabla en el DOM.");

        tableBody.innerHTML = "";

        data.forEach(movement => {
            const row = document.createElement("tr");
            const colorClass = movement.tipo === "Ingreso" ? "text-success" : "text-danger";

            row.innerHTML = `
                <td>${movement.descripcion}</td>
                <td class="${colorClass} fw-bold">${movement.monto}</td>
                <td>${movement.tipo}</td>
                <td>${new Date(movement.fecha).toLocaleString()}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-2 edit-btn" data-id="${movement.id}">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${movement.id}">🗑️ Eliminar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => deleteMovement(button.dataset.id));
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const row = event.target.closest("tr");
                const id = button.dataset.id;
                const descripcion = row.children[0].textContent;
                const monto = parseFloat(row.children[1].textContent.replace(/[^\d.-]/g, "")); 
                const tipo = row.children[2].textContent;

                editMovement(id, descripcion, monto, tipo);
            });
        });

    } catch (error) {
        console.error("Error cargando los movimientos:", error);
    }
}

// Función para editar un movimiento
function editMovement(id, descripcion, monto, tipo) {
    document.getElementById("description").value = descripcion;
    document.getElementById("amount").value = monto;
    document.getElementById("type").value = tipo;

    isEditing = true;
    editingId = id;

    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.textContent = "Actualizar Movimiento";
    } else {
        console.error("Botón submitButton no encontrado en el DOM.");
    }
}

// Evento para agregar o actualizar un movimiento
document.getElementById("movementForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("description").value;
    const monto = parseFloat(document.getElementById("amount").value);
    const tipo = document.getElementById("type").value;
    const token = sessionStorage.getItem("token");

    if (isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número positivo.");
        return;
    }

    try {
        let method, url;

        if (isEditing) {
            method = "PUT";
            url = `http://localhost:3000/movements/${editingId}`;
        } else {
            method = "POST";
            url = "http://localhost:3000/movements";
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ descripcion, monto, tipo }),
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        alert(isEditing ? "Movimiento actualizado." : "Movimiento agregado.");

        isEditing = false;
        editingId = null;
        document.getElementById("movementForm").reset();
        
        const submitButton = document.getElementById("submitButton");
        if (submitButton) {
            submitButton.textContent = "Agregar Movimiento";
        }

        loadMovements();
    } catch (error) {
        console.error("Error al guardar el movimiento:", error);
    }
});

// Función para eliminar un movimiento con autenticación
async function deleteMovement(id) {
    if (!confirm("¿Seguro que quieres eliminar este movimiento?")) return;

    const token = sessionStorage.getItem("token"); // Obtener el token

    try {
        const response = await fetch(`http://localhost:3000/movements/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        alert("Movimiento eliminado correctamente.");
        loadMovements(); // Recargar lista después de eliminar
    } catch (error) {
        console.error("Error eliminando movimiento:", error);
        alert("Ocurrió un error al eliminar el movimiento.");
    }
}