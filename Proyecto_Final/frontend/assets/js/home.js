document.addEventListener("DOMContentLoaded", function() {
    let saldoTotal = 1500.00;
    let movimientos = ["Ingreso: $500", "Gasto: $200", "Ingreso: $300"];

    document.getElementById("saldo-total").innerText = `$${saldoTotal.toFixed(2)}`;
    let lista = document.getElementById("lista-movimientos");
    lista.innerHTML = "";
    movimientos.forEach(mov => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = mov;
        lista.appendChild(li);
    });
});