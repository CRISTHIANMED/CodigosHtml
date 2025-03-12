let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    pagina++;
    cargarPeliculas();
});  

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina--;
        cargarPeliculas();
    }
});

const cargarPeliculas = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2416814b059c5e982091b07f24dd28f7&language=es-MX&page=${pagina}`);
        
        console.log(response);
        if (response.status === 200) {
            const data = await response.json();
            let peliculas = '';
            
            data.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class = "poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>         
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(response.status === 401){
            console.log('No autorizado api_key incorrecta');
        }
        else {
            console.log('Error en la petición');
        }
    } catch (error) {
        console.log(error);
    }
};

cargarPeliculas();