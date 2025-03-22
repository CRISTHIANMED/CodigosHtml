let editRowIndex = -1; // Variable para almacenar el índice de la fila que se está editando

document.getElementById('personForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const identification = document.getElementById('identification').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];

    if (editRowIndex === -1) {
        // Agregar nueva fila
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${identification}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
    } else {
        // Actualizar fila existente
        const row = table.rows[editRowIndex-1];
        row.cells[0].innerText = identification;
        row.cells[1].innerText = firstName;
        row.cells[2].innerText = lastName;
        row.cells[3].innerText = email;
        row.cells[4].innerText = phone;
        editRowIndex = -1; // Resetear el índice de edición
    }

    document.getElementById('personForm').reset();
});

// Función para manejar el clic en el botón "Editar"
document.getElementById('personTable').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;
        document.getElementById('identification').value = row.cells[0].innerText;
        document.getElementById('firstName').value = row.cells[1].innerText;
        document.getElementById('lastName').value = row.cells[2].innerText;
        document.getElementById('email').value = row.cells[3].innerText;
        document.getElementById('phone').value = row.cells[4].innerText;

        editRowIndex = row.rowIndex; // Guardar el índice de la fila que se está editando
    }

    // Función para manejar el clic en el botón "Eliminar"
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentElement.parentElement;
        row.remove(); // Eliminar la fila
    }
});