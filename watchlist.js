const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const watchlistBtn = document.getElementById('watchlist-btn');
const searchBtn = document.getElementById("search-btn")

// load movies from API with name search
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&apikey=55ab83a3`
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
}
loadMovies("superman")

async function getMovieDetailsAsync (id){
    const baseURL = `https://omdbapi.com/?i=${searchTerm}&apikey=55ab83a3`
        try {
            // make request 
            const detailResponse = await fetch(`${baseURL}}`);
            // get response : json
            const details = await detailResponse.json();
            // movie
            const movie = new Movie(details.imdbID, details.Title, details.imdbRating, details.Runtime, details.Genre, details.Plot, details.Poster);
            //return movie
            return movie
        } catch (detailError) {
            console.error('Failed to fetch movie details:', detailError);
        }
    }
