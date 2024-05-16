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
