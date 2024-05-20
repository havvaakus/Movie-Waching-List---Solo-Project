const searchInput = document.getElementById("search-input")
const resultsContainer = document.getElementById("results-container")
const watchlistBtn = document.getElementById("watchlist-btn")
const searchBtn = document.getElementById("search-btn")

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

searchBtn.addEventListener("click", async () => {
    const searchInputValue = searchInput.value
    const movies = await loadMoviesAsync(searchInputValue)

    resultsContainer.innerHTML = '' // Clear previous results

    displayMovies(movies);
})

// Function to fetch movie details by ID
async function fetchMovieDetailsAsync(movieId) {
    const movieDetailsURL = `https://omdbapi.com/?i=${movieId}&apikey=55ab83a3`
    const movieDetailsRes = await fetch(movieDetailsURL)
    const details = await movieDetailsRes.json()
    const movie = new Movie(details.imdbID, details.Title, details.imdbRating, details.Runtime, details.Genre, details.Plot, details.Poster);
    return movie
}

// Function to load movies from API with name search
async function loadMoviesAsync(searchTerm) {
    const searchURL = `https://omdbapi.com/?s=${searchTerm}&apikey=55ab83a3`
    const searchRes = await fetch(searchURL)
    const searchData = await searchRes.json()

    if (searchData.Response === "True") {
        const movies = searchData.Search
        const moviesWithDetails = []
        for (let i = 0; i < movies.length; i++) {
            const movieId = movies[i].imdbID
            const movieDetails = await fetchMovieDetailsAsync(movieId)
            moviesWithDetails.push(movieDetails)
        }
        return moviesWithDetails
    } else {
        console.log("No movies found")
        return [] // Return an empty array if no movies are found
    }
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const movieId = movie.id;
        const watchlist = getWatchlist();

        const isInWatchlist = watchlist.includes(movieId);

        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
            <img src=${movie.posterUrl}></img>
            <h2>${movie.name} (⭐${movie.score})</h2>
            <h3>${movie.runtime} ${movie.genre}</h3>
            <p>${movie.description}</p>
            ${!isInWatchlist ? `<button onclick="addToWatchlist('${movie.id}')" class="btn"><i class="fa fa-plus"></i> Watchlist</button>` : "<p>Movie is already in your watchlist</p>"}
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

//Add the movies local storage
function addToWatchlist(movieId) {
    const watchlist = getWatchlist();
    if (!watchlist.some(id => id == movieId)) {
        watchlist.push(movieId)
        updateWatchlist(watchlist);
    }
}

// Remove item from local storage with given id
function removeFromWatchlist(movieId) {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter(id => id !== movieId);
    updateWatchlist(updatedWatchlist);
}



