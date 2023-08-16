var express = require("express");
var router = express.Router();
const axios = require("axios"); // Import the axios library

router.use(express.json());

function stringOfProviders(providerList) {
  let providerArray = [];
  providers = { "Netflix": 8, "Hulu": 15, "Apple TV": 350 };

  for (const provider of providerList) {
    if (provider in providers) {
      providerArray.push(providers[provider]);
    }
  }
  let resultString = providerArray.join("|");
  return resultString;
}

function stringOfGenres(genreList) {
    let genereArray = [];
    genres = { "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35, "Crime": 80, "Documentary": 99, "Drama": 18, "Family": 10751,
                "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402, "Mystery": 9648, "Romance": 10749, "Science Fiction": 878, 
                "TV Movie": 10770, "Thriller": 53, "War": 10752, "Western": 32 };

    for (const genre of genreList) {
        if (genre in genres) {
        genreArray.push(genres[genre]);
        }
    }
    let resultString = genereArray.join("|");
    return resultString;
}

async function getMovieData(providerIds) {
    
    const options = {
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTFhNmEyNjIxOTIxNDJkODM3YTYwN2NjOTE5NjdkNyIsInN1YiI6IjY0ZDk0OTU1NjNhYWQyMDEwMDIyYjIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY1G3T5diE0Td6wZ_e_whWosholUmqBqlURMnXpkbow'
        }
    };

    try {
        
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=7.5&vote_count.gte=100&watch_region=US&with_original_language=en&with_watch_providers=${providerIds}`, options);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

router.post("/", async function(req, res, next) {
    let providerIds = stringOfProviders(req.body.data);
    const movieData = await getMovieData(providerIds);
    res.json(movieData.results); // Send the movie data as JSON response

    movieData.results.forEach(item => {
        console.log("Original Title:", item.original_title);
        console.log("-------------------------------");
      });
    // res.send("API is working properly POST");


});

module.exports = router;
