var express = require("express");
var router = express.Router();

router.use(express.json())


function stringOfProviders(providerList) {
    let providerArray = []
    providers = { "Netflix": 8, "Hulu": 15, "AppleTV": 350}

    for (const provider of providerList) {
        if (provider in providers) {
            providerArray.push(providers[provider]);
        }
        
    }
    let resultString = providerArray.join("|");
    return resultString;

}



async function getMovieData(providerIds) {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTFhNmEyNjIxOTIxNDJkODM3YTYwN2NjOTE5NjdkNyIsInN1YiI6IjY0ZDk0OTU1NjNhYWQyMDEwMDIyYjIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HY1G3T5diE0Td6wZ_e_whWosholUmqBqlURMnXpkbow'
      }
      };
      
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_original_language=en&with_watch_providers=${providerIds}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
        
}

router.post("/", function(req, res, next) {
    let providerIds = stringOfProviders(req.body.data)
    console.log(providerIds)
    getMovieData(providerIds)
    res.send("API is working properly POST");
});



module.exports = router;