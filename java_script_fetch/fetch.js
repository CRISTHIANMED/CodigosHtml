const link = "https://jsonplaceholder.typicode.com/users";

/*
fetch(link) //Retorna uma promessa
    .then(response => response.json()) //Retorno explicito
    .then(data => console.log(data)) //Retorno implicito
*/

const hola = async () => {
    const response  = await fetch(link) 
    const data = await response.json()
    console.log(data)
}

hola();

