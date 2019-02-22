require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');
var inquire = require('inquirer');

// spotify keys loaded
var spotify = new Spotify(keys.spotify);

//get command 
var command = process.argv[2];

// liri to take a command by using prompt this is not functional yet 
/*inquire
.prompt([
    {
        type:"input",
        message:"Who is the artist/song/movie to search",
        name:"artistOrMovie"
    }
]).then(function(inquirerResponse){
    //read input
    //console.log(inquirerResponse);
});*/

//manually enter artist 
var artist = "";
artist = process.argv[3];
// take action on the command
if(command === 'concert-this'){
    
    //search the Bands in Town Artist Events API and render on the terminal event info
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
            //loop through data and print to bash 
   
            for (let j in response.data) {
                console.log(`Artist: `,artist);
                console.log("Venue Name : " + response.data[j].venue.name);
                console.log("Venue Location : " + response.data[j].venue.city);
                console.log("Date of Event : " + moment(response.data[j].datetime).format("MM/DD/YYYY"));
                console.log(`-----------------------`);
            }
        }
      );
}else if(command === 'spotify-this-song'){
    //display on terminal/bash window song information
    // console.log  (spotify);
    // create a variable for the query into spotify API search
    let songtitle = process.argv[3];
    if(songtitle.length === 0){
        songtitle = "The Sign";
    }
    spotify.search({ type: 'track', query: songtitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data.tracks.items[0]);
        // console.log(data.tracks.items[0]);

        //the Artist(s)
        console.log('Artist : '+data.tracks.items[0].album.artists[0].name);
       
        //the song name
        console.log(`Song Name : `+songtitle);

        //preview link of the song from spotify
        console.log(`External spotify preview url : `+data.tracks.items[0].album.external_urls.spotify)
        //album the song is from 
        console.log(`Album : `+data.tracks.items[0].album.name);
    });
    // if no song is retrieved from APi, display the default "The Sign" by Ace of Base.
}else if(command === 'movie-this'){
    // display movie information on the terminal/bash window

}else if(command === 'do-what-it-says'){
    // read from the random text file to call one of liri's commands above 
}





// to get omdb movies
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=c377f6c3").then(
//   function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );



