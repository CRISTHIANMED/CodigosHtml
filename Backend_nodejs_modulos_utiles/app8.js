function mostrarTema(tema) {
    console.log(`Estoy aprendiendo ${tema}`);
}

setInterval(mostrarTema, 2000, 'Node.js'); // Llama a la función cada 2 segundos