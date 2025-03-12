let p = new Promise((resolve, reject) => {
    let isTrue = true;
    if (isTrue) {
        resolve('Exito al conectar');
    } else {
        reject('Error al conectar');
    }
});

p
    .then(message => console.log(`Promise resolved: ${message}`))
    .catch(message => console.log(`Promise rejected: ${message}`));

