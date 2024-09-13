

## Paso 1: Configuración de la API

Antes de comenzar, necesitarás obtener una clave de API de TMDb. Puedes obtener una clave de API registrándote en el sitio web de TMDb. Una vez que tengas tu clave de API, reemplaza `'API_KEY'` en el código con tu clave de API.

    let api_key = 'TU_CLAVE_DE_API'

## Paso 2: Definición de las URL de la API

A continuación, definiremos las URL base de la API y la URL base de las imágenes de las películas. Estas URL se utilizarán para realizar la búsqueda de películas y mostrar las imágenes de las mismas respectivamente.

    let urlBase = 'https://api.themoviedb.org/3/search/movie'
    let urlImg = 'https://image.tmdb.org/t/p/w500'

## Paso 3: Obtención de elementos del DOM

En este paso, obtenemos los elementos HTML necesarios para interactuar con la aplicación. Utilizamos `getElementById` para obtener el botón de búsqueda y el campo de entrada de texto.


## Paso 4: Función de búsqueda de películas

La función `buscarPeliculas` se ejecuta cuando se hace clic en el botón de búsqueda. Obtiene el valor ingresado en el campo de entrada de texto y realiza una solicitud a la API de TMDb para buscar películas que coincidan con el término de búsqueda.

    function buscarPeliculas(){
        let searchInput = document.getElementById('searchInput').value
        fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => Pantalla(response.results))
    }

## Paso 5: Función para mostrar las películas encontradas

La función `Pantalla` se utiliza para mostrar los resultados de la búsqueda de películas. Borra el contenido anterior del contenedor de resultados y luego itera sobre la lista de películas encontradas. Para cada película, crea elementos HTML para mostrar su título, fecha de lanzamiento, descripción y póster.

    
    function Pantalla(movies) { 
        let resultadoDiv = document.getElementById('results');
        resultadoDiv.innerHTML = '';

        if (movies.length === 0) {
        resultadoDiv.innerHTML = '<p> No se encontro ningún resultado </p>';
        return;
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie'); 

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let fechaLanzamiento = document.createElement('p'); 
        fechaLanzamiento.textContent = 'La fecha de lanzamiento fue: ' + movie.releaseDate;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;

    
        if (posterPath) {
            let poster = document.createElement('img');
            poster.src = posterPath;
            movieDiv.appendChild(poster);
        }

        movieDiv.appendChild(title);
        movieDiv.appendChild(fechaLanzamiento);   
        movieDiv.appendChild(overview);
        resultadoDiv.appendChild(movieDiv);
    });
}

