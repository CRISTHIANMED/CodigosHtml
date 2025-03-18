function OrderProduct(product) {
    return new Promise((resolve, reject) => {
        console.log(`Ordering: ${product} of my store online `) // Promise is pending
        setTimeout(() => {
            if (product == "cup") {
                resolve('Ordering a cup in my store online'); // Promise is resolved
            } else {
                reject(`${product} is not available in my store online`); // Promise is rejected
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

async function placeAnOrder(product) {
    try {
        const response = await OrderProduct(product);
        console.log('Response received') // satus pending
        const responseProcessed = await processOrder(response);
        console.log(responseProcessed)
    }
    catch (error) {
        console.log(error)
    }
}

placeAnOrder('cup');
placeAnOrder('pencil'); 