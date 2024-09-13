document.getElementById('searchButton').addEventListener('click', buscarPeliculas);

let apiKey = 'cc8fcb2db85080251e58683a860c718a';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';

function buscarPeliculas() {
  let searchEntrada = document.getElementById('searchInput').value;

  fetch(`${urlBase}?query=${searchEntrada}&api_key=${apiKey}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => Pantalla(respuesta.results));
}

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


