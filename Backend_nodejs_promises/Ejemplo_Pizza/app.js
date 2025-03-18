const statusOrder = () => {
    const status = Math.random() < 0.5;
    console.log('statusOrder', status)
    return status
};

const myOrderPizza = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (statusOrder()) {
            resolve('Order is ready, your pizza is on the way');
        } else {
            reject('Happen error, please try again');
        }
    }, 1000);
});


const handleOrderPizza = (messageConfirmation) => {
    console.log(messageConfirmation)
}

const rejectionOrderPizza = (messageError) => {
    console.log(messageError)
}

myOrderPizza
    .then(handleOrderPizza)
    .catch(rejectionOrderPizza);

