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

const baseURL = `http://www.omdbapi.com/?apikey=55ab83a3`

async function search (parameter) {
    let movieArray = []
    try {
        const response = await fetch(`${baseURL}&s=${encodeURIComponent(parameter)}`);
        const data = await response.json();
        for (let movie of data.Search) {
            try {
                const detailResponse = await fetch(`${baseURL}&i=${encodeURIComponent(movie.imdbID)}`);
                const details = await detailResponse.json();
                
                movieArray.push(new Movie(details.imdbID, details.Title, details.imdbRating, details.Runtime, details.Genre, details.Plot, details.Poster));
            } catch (detailError) {
                console.error('Failed to fetch movie details:', detailError);
            }
        }
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
    return movieArray;
}
searchBtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input").value;
    const movies = await search(searchInput)
    console.log(movies)

    const resultsContainer = document.getElementById('results-container') // Make sure this div exists in your HTML
    resultsContainer.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieElement = document.createElement('div')
        movieElement.innerHTML = `
            <img src=${movie.posterUrl}></img>
            <h2>${movie.name} (${movie.score})</h2>
            <h2>${movie.name}${movie.name}</h2>
            <button onclick='handleAddToWatchlist("${movie.id}")'>Add to Watchlist</button>
        `;
        resultsContainer.appendChild(movieElement)
    });
});

//Define localstorage helper function
function addToWatchlist(movie) {
    const watchlist = getWatchlist()
    // Check if the movie is already in the watchlist
    if (!watchlist.some(m => m.id === movie.id)) {
        watchlist.push(movie)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }
}

function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
}



function handleAddToWatchlist(movieId) {
    const movie = movies.find(m => m.id === movieId);
    addToWatchlist(movie);
}





// kimin watchlisti
// watchlist i localstorage da saklayabilirsin : resetlenince watchlist gider
// database kullanabilirsin persistence storage
// user yapisi
    // authorisation
    // token
// async function getWatchlist (parameter) {
//     // TODO: retrieve watchlist using parameter
//     // Q: what is the type of parameter?
// }

// async function addToWatchlist (movieId) {
//     // TODO: add movie to watchlist
// }

// async function removeFromWatchlist (movieId) {
//     // TODO: remove movie from watchlist
// }


//Return watchlist page
watchlistBtn.addEventListener("click", function() {
    window.location.href = 'watchlist.html';
});
