
function showMovieDetails(movieId) {
    var apiKey = '587b4d33'; // Replace with your actual API key
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(movieDetails => {
            // Display movie details in the #movie-details-container element
            var movieDetailsContainer = document.getElementById("movie-details-container");

            var titleElement = document.createElement("h2");
            
            titleElement.textContent = movieDetails.Title;

            var imageElement = document.createElement("img");
            imageElement.src = movieDetails.Poster;
            imageElement.alt = movieDetails.Title;

            var plotElement = document.createElement("p");
            plotElement.textContent = movieDetails.Plot;

            movieDetailsContainer.appendChild(titleElement);
            movieDetailsContainer.appendChild(imageElement);
            movieDetailsContainer.appendChild(plotElement);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}