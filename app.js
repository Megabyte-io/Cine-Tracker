const container = document.querySelector(".container");
const home = document.querySelector("#home");
const upcoming = document.querySelector("#upcoming");
const popular = document.querySelector("#popular");
const heroTitle = document.querySelector("#heroTitle");
const movieInfoYear = document.querySelector("#movieInfoYear");
const movieInfoGenre = document.querySelector("#movieInfoGenre");
const movieInfoType = document.querySelector("#movieInfoType");
const rating = document.querySelector(".rating");
const hero = document.querySelector(".hero");
const about = document.querySelector("#heroOverview");
const tag = document.querySelector(".tag");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");






const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

const options = {
    method: "GET",
    headers: {
        Authorization: "PUT YOUR TMDB TOKEN HERE"
    }
};

  const movieTracker = async () => {
      let movieName = "troy"
      let URL = `https://api.themoviedb.org/3/search/movie?query=${movieName}`;
      let response = await fetch(URL , options);
      let data = await response.json();   
  }


  const makeCards = (data , i)=>{
      let card = document.createElement("div");
      card.className = "card";
      container.appendChild(card);
      let img = document.createElement("img");
      let title = document.createElement("h4");
      let year = document.createElement("h6");
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(year);
      img.src = "https://image.tmdb.org/t/p/w500"+ data.results[i].poster_path;
      img.className = "movieImg";
      title.innerText = data.results[i].original_title;
      year.innerText = data.results[i].release_date.slice(0,4);
      card.addEventListener("click" , ()=>{
        showMovie(data.results[i]);
      })
      
  }
  const updateHero = (data)=>{
    heroTitle.innerText = data.results[0].original_title;
    movieInfoYear.innerText = data.results[0].release_date.slice(0,4);
    let genre1 = data.results[0].genre_ids[0];
    let genre2 = data.results[0].genre_ids[1];
    movieInfoGenre.innerText = genres[genre1];
    movieInfoType.innerText = genres[genre2] || "";
    let voteRatings = data.results[0].vote_average;
    rating.innerText = "⭐ " + Math.trunc(voteRatings * 10) / 10;
    about.innerText = data.results[0].overview;
  }

  const popularTracker = async() =>{
      let URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
      let response = await fetch(URL , options);
      let data = await response.json();

      container.innerHTML = "";
      hero.style.backgroundImage = `
      linear-gradient(
      90deg,
    rgba(5, 8, 15, 0.98) 0%,
    rgba(5, 8, 15, 0.90) 20%,
    rgba(5, 8, 15, 0.65) 45%,
    rgba(5, 8, 15, 0.35) 70%,
    rgba(5, 8, 15, 0.10) 100%
    ),
    url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`;
    updateHero(data);
      for(let i= 0;i<= 19;i++){
      makeCards(data , i);
    }
  }
  popularTracker();

  searchBtn.addEventListener("click" , ()=>{
    const movieSearch = async() =>{

      let movieName = search.value;
      let URL = `https://api.themoviedb.org/3/search/movie?query=${movieName}`;
      let response = await fetch(URL , options);
      let data = await response.json();
      search.value = "";
      hero.style.display = "none";
      container.innerHTML = "";
      hero.innerHTML = "";
      for (let i = 0; i < 11; i++) {
      makeCard(data.results[i]);
    }
  }
    movieSearch();
  })


  const makeCard = (movie) => {

      const card = document.createElement("div");
      card.className = "movieCard";

      const img = document.createElement("img");
      img.className = "movieImg";

      const info = document.createElement("div");
      info.className = "cardInfo";

      const title = document.createElement("h3");
      title.className = "movieTitle";

      const details = document.createElement("div");
      details.className = "movieDetails";

      const year = document.createElement("span");
      const rating = document.createElement("span");

      // Poster
      if (movie.poster_path) {
          img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      } else {
          img.src = "https://via.placeholder.com/500x750?text=No+Poster";
      }

      // Movie title
      title.innerText = movie.original_title;

      // Year
      year.innerText = movie.release_date
          ? movie.release_date.slice(0, 4)
          : "N/A";

      // Rating
      rating.innerText = `⭐ ${Math.trunc(movie.vote_average * 10) / 10}`;

      details.appendChild(year);
      details.appendChild(rating);

      info.appendChild(title);
      info.appendChild(details);

      card.appendChild(img);
      card.appendChild(info);

      card.addEventListener("click" , ()=>{
        showMovie(movie);
      })

      container.appendChild(card);
  };

  home.addEventListener("click" , ()=>{
      const popularTracker = async() =>{
      let URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
      let response = await fetch(URL , options);
      let data = await response.json();

      container.innerHTML = "";
      hero.style.backgroundImage = `
      linear-gradient(
      90deg,
    rgba(5, 8, 15, 0.98) 0%,
    rgba(5, 8, 15, 0.90) 20%,
    rgba(5, 8, 15, 0.65) 45%,
    rgba(5, 8, 15, 0.35) 70%,
    rgba(5, 8, 15, 0.10) 100%
    ),
    url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`;
    updateHero(data);
      for(let i= 0;i<= 19;i++){
      makeCards(data , i);
      }
    }
    popularTracker();
  })



  upcoming.addEventListener("click" , ()=>{
      const trendTab = async()=>{
      let URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'
      let response = await fetch(URL , options);
      let data = await response.json();
      tag.innerText = "";
      container.innerHTML = "";
      hero.style.backgroundImage = `
      linear-gradient(
      90deg,
    rgba(5, 8, 15, 0.98) 0%,
    rgba(5, 8, 15, 0.90) 20%,
    rgba(5, 8, 15, 0.65) 45%,
    rgba(5, 8, 15, 0.35) 70%,
    rgba(5, 8, 15, 0.10) 100%
      ),
        url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`;
      container.innerHTML = "";
      updateHero(data);
      for(let i= 0;i<= 19;i++){
      makeCards(data , i);
      }
      }
      trendTab();
  })

  popular.addEventListener("click" , ()=>{
    const popularTab = async()=>{
      let URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200' 
      let response = await fetch(URL , options);
      let data = await response.json();
      tag.innerText = "";
      container.innerHTML = "";
      hero.style.backgroundImage = `
      linear-gradient(
      90deg,
    rgba(5, 8, 15, 0.98) 0%,
    rgba(5, 8, 15, 0.90) 20%,
    rgba(5, 8, 15, 0.65) 45%,
    rgba(5, 8, 15, 0.35) 70%,
    rgba(5, 8, 15, 0.10) 100%
      ),
        url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`;
      container.innerHTML = "";
      updateHero(data);
      for(let i= 0;i<= 19;i++){
      makeCards(data , i);
      }
    }
    popularTab();
  })

  let savedHeroDisplay ="";

  const showMovie = (movie) => {


    savedHeroDisplay = hero.style.display;
    container.style.display = "none";
    hero.style.display = "none";

    const screen = document.createElement("div");
    screen.className = "movieScreen";


    const backdrop = document.createElement("div");
    backdrop.className = "movieBackdrop";

    if (movie.backdrop_path) {
        backdrop.style.backgroundImage =
            `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    }


    const overlay = document.createElement("div");
    overlay.className = "movieOverlay";



    const content = document.createElement("div");
    content.className = "movieContent";



    const poster = document.createElement("img");
    poster.className = "detailPoster";

    if (movie.poster_path) {

        poster.src =
            "https://image.tmdb.org/t/p/w500" +
            movie.poster_path;

    } else {

        poster.src =
            "https://via.placeholder.com/500x750?text=No+Poster";
    }



    const info = document.createElement("div");
    info.className = "detailInfo";



    const title = document.createElement("h1");
    title.innerText = movie.original_title;


    const meta = document.createElement("div");
    meta.className = "detailMeta";


    const rating = document.createElement("span");
    rating.innerText =
        `⭐ ${Math.trunc(movie.vote_average * 10) / 10}`;


    const year = document.createElement("span");
    year.innerText =
        movie.release_date
            ? movie.release_date.slice(0, 4)
            : "N/A";


    const genre1 = document.createElement("span");
    genre1.innerText =
        genres[movie.genre_ids[0]] || "Unknown";


    const genre2 = document.createElement("span");

    if (movie.genre_ids[1]) {
        genre2.innerText =
            genres[movie.genre_ids[1]];
    }


    meta.appendChild(rating);
    meta.appendChild(year);
    meta.appendChild(genre1);

    if (genre2.innerText) {
        meta.appendChild(genre2);
    }


    const overview = document.createElement("p");

    overview.innerText =
        movie.overview ||
        "No overview available for this movie.";



    const trailerBtn = document.createElement("button");

    trailerBtn.className = "trailerBtn";

    trailerBtn.innerText =
        "▶  Watch Trailer";


    trailerBtn.addEventListener("click", async () => {
    const URL = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;
    const response = await fetch(URL, options);
    const data = await response.json();

    const trailer = data.results.find(
        v => v.site === "YouTube" && v.type === "Trailer"
    ) || data.results.find(v => v.site === "YouTube"); // fallback to any YouTube video

    if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
        alert("No trailer available for this movie.");
    }
   });
    const closeBtn = document.createElement("button");

    closeBtn.className = "closeBtn";

    closeBtn.innerText = "X";


    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(overview);
    info.appendChild(trailerBtn);

    content.appendChild(poster);
    content.appendChild(info);

    screen.appendChild(backdrop);
    screen.appendChild(overlay);
    screen.appendChild(content);
    screen.appendChild(closeBtn);

    document.body.appendChild(screen);


    const closeAndRestore = () =>{
        screen.remove();
        container.style.display ="";
        hero.style.display = savedHeroDisplay;
    }

    closeBtn.addEventListener("click", closeAndRestore);

};




