let isEditing = false;
let editingId = null;

// Función para cargar los movimientos
async function loadMovements() {
    try {
        const response = await fetch("http://localhost:3000/movements");
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        const tableBody = document.getElementById("movementsTableBody");
        tableBody.innerHTML = ""; // Limpiar antes de agregar nuevos datos

        data.forEach(movement => {
            const row = document.createElement("tr");

            // 🔥 Aplicar color según el tipo de movimiento
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

        // Reasignar eventos después de cargar los datos
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => deleteMovement(button.dataset.id));
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const row = event.target.closest("tr");
                const id = button.dataset.id;
                const descripcion = row.children[0].textContent;
                const monto = row.children[1].textContent;
                const tipo = row.children[2].textContent;

                editMovement(id, descripcion, monto, tipo);
            });
        });

    } catch (error) {
        console.error("Error cargando los movimientos:", error);
    }
}

// Función para eliminar un movimiento
async function deleteMovement(id) {
    if (!confirm("¿Seguro que quieres eliminar este movimiento?")) return;

    try {
        const response = await fetch(`http://localhost:3000/movements/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        alert("Movimiento eliminado correctamente.");
        loadMovements(); // Recargar lista después de eliminar
    } catch (error) {
        console.error("Error eliminando movimiento:", error);
    }
}

// Función para editar un movimiento
function editMovement(id, descripcion, monto, tipo) {
    document.getElementById("description").value = descripcion;
    document.getElementById("amount").value = monto;
    document.getElementById("type").value = tipo;
    
    // Activamos la bandera de edición
    isEditing = true;
    editingId = id;

    document.getElementById("submitButton").textContent = "Actualizar Movimiento";
}

// Evento para agregar o actualizar un movimiento
document.getElementById("movementForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const descripcion = document.getElementById("description").value;
    const monto = parseFloat(document.getElementById("amount").value); // Convertir a número
    const tipo = document.getElementById("type").value;

    // Validación: Monto no puede ser negativo
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descripcion, monto, tipo })
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        alert(isEditing ? "Movimiento actualizado." : "Movimiento agregado.");

        // Restablecer estado después de agregar o actualizar
        isEditing = false;
        editingId = null;
        document.getElementById("movementForm").reset();
        document.getElementById("submitButton").textContent = "Agregar Movimiento";
        loadMovements();

    } catch (error) {
        console.error("Error guardando movimiento:", error);
    }
});



document.addEventListener("DOMContentLoaded", loadMovements);


