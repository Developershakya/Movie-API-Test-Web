
document.getElementById("search-bar").addEventListener("input", debounce(searchMovies, 500));
document.getElementById("search-button").addEventListener("click", searchMovies);

function searchMovies() {
    var searchTerm = document.getElementById("search-bar").value;
    if (searchTerm.trim() === "") {
        document.getElementById("search-results").innerHTML = "";
        return;
    }

    var apiKey = '587b4d33'; // Replace with your actual API key
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                document.getElementById("search-results").innerHTML = "<p>No results found</p>";
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById("search-results");
    searchResultsDiv.innerHTML = "";

    results.forEach(movie => {
        var movieInfoDiv = document.createElement("div");
        movieInfoDiv.className = "movie-info";




        var imageElement = document.createElement("img");
        
        imageElement.src = movie.Poster;
        imageElement.alt = movie.Title;
        imageElement.style.width = "100%";
        imageElement.style.height = "100%";
        imageElement.style.margin = "0px";
        
//  --------------------------conent-------------------

        let contentDiv = document.createElement("div");
        contentDiv.className ='content';
       


        let hdDiv = document.createElement("div");
        hdDiv.className ='hd';
        hdDiv.textContent= 'FULL HD';



        let detailDiv = document.createElement("div");
        detailDiv.className ='detail';

        let year = document.createElement('span');
        year.textContent = movie.Year;

        var titleElement = document.createElement("strong");
        titleElement.textContent = movie.Title;

 let genreDiv = document.createElement('div');
 genreDiv.className ='genre';

        let overlay = document.createElement('a');
        overlay.className ='play';

    let link = document.createElement('a');
    link.textContent = 'DOWNLOAD';
    let imdbDiv = document.createElement('div');
    imdbDiv.className ='imdb';
  
    let imdbImg = document.createElement('img');
    let imbdSpan = document.createElement('span')
    imbdSpan.textContent='5.2';
    imdbImg.src ='download.jpg';
    imdbImg.className = 'imdb-img';

  let icon = document.createElement('i');
  icon.className = 'uil uil-play';

 
       movieInfoDiv.appendChild(overlay);
       overlay.appendChild(icon);
       movieInfoDiv.appendChild(imageElement);
        movieInfoDiv.appendChild(contentDiv);
        contentDiv.appendChild(hdDiv);
        contentDiv.appendChild(detailDiv);
        detailDiv.appendChild(year);
        detailDiv.appendChild(titleElement);
        detailDiv.appendChild(genreDiv);
        genreDiv.appendChild(link);
        genreDiv.appendChild(imdbDiv);
        imdbDiv.appendChild(imbdSpan)
        imdbDiv.appendChild(imdbImg)

        movieInfoDiv.addEventListener("click", function () {
            // Redirect to next.html with movie details as a query parameter
            var movieId = encodeURIComponent(movie.imdbID);
            window.location.href = `next.html?movieId=${movieId}`;
        });

        searchResultsDiv.appendChild(movieInfoDiv);
    });
}


// Debounce function to limit API requests while typing
function debounce(func, delay) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}
