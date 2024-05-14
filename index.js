// const watchlistBtn = document.getElementById("watchlist-btn")

const searchBtn = document.getElementById("search-btn")



searchBtn.addEventListener("click", async() => {
    const searchInput = document.getElementById("search-input").value
    
    const res = await fetch (`http://www.omdbapi.com/?apikey=55ab83a3&s=${searchInput}`)
    const data = await res.json()
    console.log(data)       
})

























// Return watchlist page
// watchlistBtn.addEventListener("click", function() {
//     window.location.href = 'watchlist.html';
// });
