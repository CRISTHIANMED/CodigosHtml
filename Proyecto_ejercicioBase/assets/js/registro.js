
let editRowIndex = -1; // Variable para almacenar el índice de la fila que se está editando
const baseUrl = "http://localhost:3000/";
const obtenerPersonas = () => {
    const url = baseUrl;
    fetch(url)
        .then(response => response.json())
        .then(personas => {
            const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];
            table.innerHTML = "";
            personas.forEach(persona => {
                // Agregar nueva fila
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${persona.id}</td>
                    <td>${persona.identificacion}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.email}</td>
                    <td>${persona.telefono}</td>
                    <td>
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Eliminar</button>
                    </td>
                `;
            });

        });
}
document.getElementById('personForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const identification = document.getElementById('identification').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];

    if (editRowIndex === -1) {

        const url = baseUrl + "agregarpersona";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identification, firstName, lastName, email, phone })
        }).then(response => response.json())
        .then(data => {
            if(data.message){
                alert(data.message);
            }
            obtenerPersonas();
        });
        
    } else {

        const url = baseUrl + `actualizarpersona/${editRowIndex}`;
        
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identification, firstName, lastName, email, phone })
        }).then(response => response.json())
        .then(data => {
            if(data.message){
                alert(data.message);
            }
            obtenerPersonas();
            editRowIndex = -1; // Resetear el índice de edición
        });        
    }

    document.getElementById('personForm').reset();
});

// Función para manejar el clic en el botón "Editar"
document.getElementById('personTable').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;
        document.getElementById('id').value = row.cells[0].innerText;
        document.getElementById('identification').value = row.cells[1].innerText;
        document.getElementById('firstName').value = row.cells[2].innerText;
        document.getElementById('lastName').value = row.cells[3].innerText;
        document.getElementById('email').value = row.cells[4].innerText;
        document.getElementById('phone').value = row.cells[5].innerText;

        editRowIndex = row.cells[0].innerText; // Guardar el índice de la fila que se está editando
    }

    // Función para manejar el clic en el botón "Eliminar"
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentElement.parentElement;
        const url = baseUrl + `eliminarpersona/${row.cells[0].innerText}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            if(data.message){
                alert(data.message);
            }
            obtenerPersonas();
        }); 
    }
});


obtenerPersonas();