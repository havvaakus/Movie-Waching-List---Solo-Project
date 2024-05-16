const searchInput = document.getElementById("search-input")
const resultsContainer = document.getElementById("results-container")
const watchlistBtn = document.getElementById("watchlist-btn")
const searchBtn = document.getElementById("search-btn")

// Function to fetch movie details by ID
async function fetchMovieDetailsAsync(movieId) {
    const movieDetailsURL = `https://omdbapi.com/?i=${movieId}&apikey=55ab83a3`
    const movieDetailsRes = await fetch(movieDetailsURL)
    const movieDetails = await movieDetailsRes.json()
    return movieDetails
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

searchBtn.addEventListener("click", async () => {
    const searchInputValue = searchInput.value
    const movies = await loadMoviesAsync(searchInputValue)

    resultsContainer.innerHTML = '' // Clear previous results

    movies.forEach(movie => {
        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
            <img src=${movie.Poster}></img>
            <h2>${movie.Title} (${movie.imdbRating})</h2>
            <h3>${movie.Runtime} ${movie.Genre}</h3>
            <p>${movie.Plot}</p>
            <button onclick='addToWatchlist("${movie.imdbID}")'>Add to Watchlist</button>
        `
        resultsContainer.appendChild(movieElement)
    })
})
function addToWatchlist(movieId, movieTitle) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    if (!watchlist.some(movie => movie.id === movieId)) {
        watchlist.push({ id: movieId, title: movieTitle })
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    } 
}