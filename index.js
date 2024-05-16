// const watchlistBtn = document.getElementById("watchlist-btn")

// const searchBtn = document.getElementById("search-btn")

// class Movie {
//     constructor(id, name, score, runtime, genre, description, posterUrl) {
//       this.id = id;
//       this.name = name;
//       this.score = score; // Rating or score of the movie
//       this.runtime = runtime; // Runtime in minutes
//       this.genre = genre; // Genre of the movie
//       this.description = description; // A brief description of the movie
//       this.posterUrl = posterUrl; // URL to the movie's poster image
//     }
// }

// const baseURL = `http://www.omdbapi.com/?apikey=55ab83a3`

// // parameter #1: movie id
// // returns: Movie
// async function getMovieDetailsAsync (id){
//     try {
//         // make request 
//         const detailResponse = await fetch(`${baseURL}&i=${encodeURIComponent(id)}`);
//         // get response : json
//         const details = await detailResponse.json();
//         // movie
//         const movie = new Movie(details.imdbID, details.Title, details.imdbRating, details.Runtime, details.Genre, details.Plot, details.Poster);
//         //return movie
//         return movie
//     } catch (detailError) {
//         console.error('Failed to fetch movie details:', detailError);
//     }
// }

// async function searchAsync (parameter) {
//     let movieArray = []
//     try {
//         const response = await fetch(`${baseURL}&s=${encodeURIComponent(parameter)}`);
//         const data = await response.json();
//         for (let movie of data.Search) {
//             movieArray.push(await getMovieDetailsAsync(movie.imdbID));
//         }
//     } catch (error) {
//         console.error('Failed to fetch:', error);
//     }
//     return movieArray;
// }

// function getWatchlistFromLocalStorage () {
//     return JSON.parse(localStorage.getItem('watchlist')) || [];
// }

// async function getWatchlistDetailsAsync() {
//     let movieArray = []
//     const watchlist = getWatchlistFromLocalStorage ();

//     if (!watchlist == []) {
//         watchlist.forEach (async movieId => {
//             movieArray.push(await getMovieDetailsAsync(movieId));
//         });
//         console.log(movieArray);
//         return movieArray;
//     }
//     else {
//         console.log("Watchlist is empty");
//         return [];
//     }
// }

// //Define localstorage helper function
// function addToWatchlist(movieId) {
//     const watchlist = getWatchlistFromLocalStorage()
//     // Check if the movie is already in the watchlist
//     if (!watchlist.some(id => id === movieId)) {
//         watchlist.push(movieId)
//         localStorage.setItem('watchlist', JSON.stringify(watchlist))
//     }
// }


// searchBtn.addEventListener("click", async () => {
//     const searchInput = document.getElementById("search-input").value;
//     const movies = await searchAsync(searchInput)

//     const resultsContainer = document.getElementById('results-container') // Make sure this div exists in your HTML
//     resultsContainer.innerHTML = ''; // Clear previous results

//     movies.forEach(movie => {
//         const movieElement = document.createElement('div')
//         movieElement.innerHTML = `
//             <img src=${movie.posterUrl}></img>
//             <h2>${movie.name} (${movie.score})</h2>
//             <h3>${movie.runtime} ${movie.genre}</h3>
//             <p>${movie.description}</p>
//             <button onclick='addToWatchlist("${movie.id}")'>Add to Watchlist</button>
//         `;
//         resultsContainer.appendChild(movieElement)
//     });
// });

// //Return watchlist page
// watchlistBtn.addEventListener("click", function() {
//     window.location.href = 'watchlist.html';
// });


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



