
const resultsContainer = document.getElementById("results-container")
const mainContent = document.getElementById("main-content")

class Movie {
    constructor(id, name, score, runtime, genre, description, posterUrl) {
      this.id = id;
      this.name = name;
      this.score = score; // Rating or score of the movie
      this.runtime = runtime; // Runtime in minutes
      this.genre = genre; // Genre of the movie
      this.description = description; // A brief description of the movie
      this.posterUrl = posterUrl; // URL to the movie's poster image
    }
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
            <img src=${movie.posterUrl}></img>
            <h2>${movie.name} ⭐${movie.score}</h2>
            <h3>${movie.runtime} ${movie.genre} <button onclick="removeFromWatchlist('${movie.id}')" class="btn"><i id="icon" class="fa-solid fa-circle-minus"></i> Remove</button></h3>
            <p>${movie.description}</p>
        `
        resultsContainer.appendChild(movieElement)
    })
}

function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || []
}

function updateWatchlist(watchlist) {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Remove item from local storage with given id
function removeFromWatchlist(movieId) {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter(id => id !== movieId);
    updateWatchlist(updatedWatchlist);
}

// Function to fetch movie details by ID
async function fetchMovieDetailsAsync(movieId) {
    const movieDetailsURL = `https://omdbapi.com/?i=${movieId}&apikey=55ab83a3`
    const movieDetailsRes = await fetch(movieDetailsURL)
    const details = await movieDetailsRes.json()
    const movie = new Movie(details.imdbID, details.Title, details.imdbRating, details.Runtime, details.Genre, details.Plot, details.Poster);
    return movie
}


async function main () {
    const watchlist = getWatchlist();

    const movies = []
    for (let i = 0; i < watchlist.length; i++) {
        const movieWithDetails = await fetchMovieDetailsAsync(watchlist[i]);
        movies.push(movieWithDetails);
    }

    displayMovies(movies);
}

main();
