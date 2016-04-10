var fs = require('fs');
var twitterkeys = require('./keys.js');
var twitter = require('twitter')
var spotify = require ('spotify')
var request = require('request');

var a = process.argv[2];
var arg = process.argv[3];


if (a === 'my-tweets' ){
twitterCall();

}else if (a === 'spotify-this-song' ) {
			song = arg
	if (song === undefined) {
		defspot(song);
	}else{
		spot(song);
	}

}else if (a === 'movie-this' ) {
	if (arg === undefined) {
		defmovie();
	}else{
		movie();
	}
	

}else if (a === 'do-what-it-says' ) {
	doCall();
}

function twitterCall() {
  var client = new twitter({
      consumer_key: 'yhzvVJaRkLnjtFPJRooIexLtn',
	  consumer_secret: 'tPM8UcsssaNC9kJ1wRKBXzwkk2hYbpewa148mjgLPUyqBOCntO',
	  access_token_key: '715890770386022400-esO0mzT3FXzqgcqTV9lBJVY2KVvNbTi',
	  access_token_secret: 'tRw0u6M7TF3IPX350CK2AjXVtej8JSFTIWeLpAEsolwLi', 
  });
var params = {screen_name: 'DiscoverMf'};
client.get('statuses/user_timeline/', params, function(error, data, response){
  if (!error) {
    // console.log(tweets);
  }
    for(var i = 0; i < data.length; i++) {
      var twitterResults = 
        "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "------- End Tweet -------" + "\r\n\r\n";
      console.log(twitterResults);
    }
});
}

function movie(){
	request('http://www.omdbapi.com/?t='+arg+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		obj = JSON.parse(body)
   console.log('Title: ' + obj.Title)
   console.log('Year: ' + obj.Year)
   console.log('Imdb Rating: ' + obj.imdbRating)
   console.log('Country: ' + obj.Country)
   console.log('Language: ' +obj.Language)
   console.log('Plot: ' +obj.Plot)
   console.log('Actors: ' +obj.Actors)
   console.log('Rotten Tomatoes Rating: ' +obj.tomatoRating)
   console.log('Rotten Tomatoes URL: ' +obj.tomatoURL)
});
}
function defmovie(){
	request('http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		obj = JSON.parse(body)
   console.log('Title: ' + obj.Title)
   console.log('Year: ' + obj.Year)
   console.log('Imdb Rating: ' + obj.imdbRating)
   console.log('Country: ' + obj.Country)
   console.log('Language: ' +obj.Language)
   console.log('Plot: ' +obj.Plot)
   console.log('Actors: ' +obj.Actors)
   console.log('Rotten Tomatoes Rating: ' +obj.tomatoRating)
   console.log('Rotten Tomatoes URL: ' +obj.tomatoURL)
});
}
function spot(song) {
  spotify.search({ type: 'track', query: song }, function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    var info = data.tracks.items[0];
    // console.log(data);

    console.log('Artist: ' +info.artists[0].name);
    console.log('Song: ' +info.name);
    console.log('Spotify URL: ' +info.external_urls.spotify)
    console.log('Album song is from: ' +info.album.name);
 ;

   
    
  })
}; // End spotifyCall()
function defspot(song) {
  spotify.search({ type: 'track', query: "what's my age again" }, function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    var info = data.tracks.items[0];
    // console.log(data);

    console.log('Artist: ' +info.artists[0].name);
    console.log('Song: ' +info.name);
    console.log('Spotify URL: ' +info.external_urls.spotify)
    console.log('Album song is from: ' +info.album.name);
 ;

   
    
  })
}; // End spotifyCall()

function doCall() {
  fs.readFile("./random.txt", "utf8", function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    data = data.split(',');
    spot(data[1]);
  })
}; // End doCall()
