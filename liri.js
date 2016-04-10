	var fs = require('fs');
	var keys = require('./keys.js');
	var twitter = require('twitter')
	var spotify = require ('spotify')
	var request = require('request');
	// console.log(keys.twitterKeys.consumer_key)

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

	// calls twitter and gets my tweets
	function twitterCall() {
  		var client = new twitter({
      	consumer_key: keys.twitterKeys.consumer_key,
	  	consumer_secret: keys.twitterKeys.consumer_secret,
	  	access_token_key: keys.twitterKeys.access_token_key,
	  	access_token_secret: keys.twitterKeys.access_token_secret, 
  	});
		var params = {screen_name: 'DiscoverMf'};
		client.get('statuses/user_timeline/', params, function(error, data, response){
  	if (!error) {
    // console.log(tweets);
    // lists my tweets
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
	} //end twitter

// movie relates to ombd and displays movie information relating to the argument passed.\
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
	}//end movie

// shows defualt movie mr.nobody
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
	}//end defmovie

// calls spotifiy and displays music information
	function spot(song) {
  		spotify.search({ type: 'track', query: song }, function(error, data) {
    	if(error) {
      	console.log('Error occurred: ' + error);
      	return;
   		}
    	var info = data.tracks.items[0];
    // console.log(info);

    	console.log('Artist: ' +info.artists[0].name);
    	console.log('Song: ' +info.name);
    	console.log('Spotify URL: ' +info.external_urls.spotify)
    	console.log('Album song is from: ' +info.album.name);   
  	})
	}; // End spot()

//displays defualt song what's my age again
	function defspot(song) {
  		spotify.search({ type: 'track', query: "what's my age again" }, function(error, data) {
    	if(error) {
      	console.log('Error occurred: ' + error);
      	return;
    	}
    	var info = data.tracks.items[0];
    	// console.log(info);

    	console.log('Artist: ' +info.artists[0].name);
    	console.log('Song: ' +info.name);
    	console.log('Spotify URL: ' +info.external_urls.spotify)
    	console.log('Album song is from: ' +info.album.name);  
  	})
	}; // End spotifyCall()

	//reads fille and does what it says
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
