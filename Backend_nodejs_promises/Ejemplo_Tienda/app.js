function OrderProduct(product) {
    return new Promise((resolve, reject) => {
        console.log(`Ordering: ${product} of my store online `) // Promise is pending
        setTimeout(() => {
            if (product == "cup") {
                resolve('Ordering a cup in my store online'); // Promise is resolved
            } else {
                reject('This product is not available in my store online'); // Promise is rejected
            }
        }, 1000);
    });
}

function processOrder(response) {
    return new Promise(resolve => {
        console.log('Precessing response...')
        console.log(`Responswe was: ${response}`)
        setTimeout(() => {
            resolve('Thanks for your purchase, enjoy your cup!');
        }, 4000);
    });
}

OrderProduct('cup')

    .then(response => {
        console.log('Response received')
        console.log(response)
        return processOrder(response);
    })
    .then(responseProcessed => {
        console.log(responseProcessed)
    })
    .catch(error => {
        console.log(error)
    });

