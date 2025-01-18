

const apiKey = '534ba8e97f8b994e08f5c6e8b8c6c364'
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const defaultPoster = "https://via.placeholder.com/500x750?text=No+Image";

// Mashhur kinolarni olish funksiyasi
async function getMovies() {
  try {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();

    const movies = data.results;
    const moviesContainer = document.getElementById("moviesContainer");
    console.log(movies);
    
    moviesContainer.innerHTML = ""; // Avvalgi ma'lumotlarni tozalash

    movies.forEach(movie => {
      const posterPath = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : defaultPoster;

      const movieDiv = document.createElement("div");
      movieDiv.className = "movie";

      movieDiv.innerHTML = `
       <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
        <button onclick="getMovieTrailer(${movie.id}, this)">Trailer ko'rish</button>
        <a href="#" target="_blank" class="trailerLink" style="display: none;">YouTube Trailer</a>
      `;

      moviesContainer.appendChild(movieDiv);
    });
  } catch (error) {
    console.error("Xato yuz berdi:", error);
  }
}

// Trailerni olish funksiyasi
async function getMovieTrailer(movieId, button) {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`);
    const data = await response.json();

    const trailers = data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
    if (trailers.length > 0) {
      const trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
      const trailerLink = button.nextElementSibling;
      trailerLink.href = trailerUrl;
      trailerLink.style.display = "inline";
      trailerLink.textContent = "Trailer-ni ko'rish";
    } else {
      alert("Trailer topilmadi.");
    }
  } catch (error) {
    console.error("Xato yuz berdi:", error);
  }
}

// Dastur ishga tushganda chaqiriladi
getMovies();
