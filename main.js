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

function displayMovies(document, container, movies) {
    movies.forEach(movie => {
        const movieId = movie.id;
        const watchlist = getWatchlist();

        const isInWatchlist = watchlist.includes(movieId);

        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
            <img src=${movie.Poster}></img>
            <h2>${movie.Title} (⭐${movie.imdbRating})</h2>
            <h3>${movie.Runtime} ${movie.Genre}</h3>
            <p>${movie.Plot}</p>
            ${!isInWatchlist ? `<button onclick="addToWatchlist('${movie.imdbID}')">Add to Watchlist</button>` : "<p>Movie is already in your watchlist</p>"}
        `
        container.appendChild(movieElement)
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
    if (!watchlist.some(movie => movie.id === movieId)) {
        watchlist.push(movieId)
        updateWatchlist(watchlist);
    }
}

// Remove item from local storage with given id
function removeFromWatchlist(movieId) {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    updateWatchlist(updatedWatchlist);
}

