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
	}else if (a === 'hey'){
		console.log('Hello user welcome to Liri');
		logE('Hello user welcome to Liri')
	}else if (a === 'liri'){
		console.log('Hello user welcome to Liri');
		logE('Hello user welcome to Liri')
	}else if (a === 'options'){
		var options = 
			'my-tweets: gets your tweets'+"\r\n"+
			'spotify-this-song: allows you to find spotify informatio on an song you like'+"\r\n"+
			'movie-this: gets information on your chosen movie'+"\r\n"+
			'do-what-it-says: reads a text file and completes an action'+"\r\n"+
			'hey: says hello';
		console.log(options);
		logE(options);
	}else{
		console.log('Invalid question try, hey, liri, my-tweets,spotify-this-song, movie-this, do-what-it-says, options')
		logE('Invalid question try, hey, liri, my-tweets,spotify-this-song, movie-this, do-what-it-says, options')
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
  	// counts out and displays multiple tweets
    	for(var i = 0; i < data.length; i++) {
      	var twitterResults = 
        "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "------- End Tweet -------" + "\r\n\r\n";
      	console.log(twitterResults);
      	logE(twitterResults);
    	}
	});
	} //end twitter

// movie relates to ombd and displays movie information relating to the argument passed.\
	function movie(){
		request('http://www.omdbapi.com/?t='+arg+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		obj = JSON.parse(body)
		//logs movie responces into variable and logs it
	   	var mResponse =
		   	'Title: ' + obj.Title+"\r\n"+
		   	'Year: ' + obj.Year+"\r\n"+
		   	'Imdb Rating: ' + obj.imdbRating+"\r\n"+
		   	'Country: ' + obj.Country+"\r\n"+
		   	'Language: ' +obj.Language+"\r\n"+
		   	'Plot: ' +obj.Plot+"\r\n"+
		   	'Actors: ' +obj.Actors+"\r\n"+
		   	'Rotten Tomatoes Rating: ' +obj.tomatoRating+"\r\n"+
		   	'Rotten Tomatoes URL: ' +obj.tomatoURL;
	   	console.log(mResponse);
	   	logE(mResponse);
	});
	}//end movie

// shows defualt movie mr.nobody
	function defmovie(){
		request('http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		obj = JSON.parse(body)
   		var mResponse =
		   	'Title: ' + obj.Title+"\r\n"+
		   	'Year: ' + obj.Year+"\r\n"+
		   	'Imdb Rating: ' + obj.imdbRating+"\r\n"+
		   	'Country: ' + obj.Country+"\r\n"+
		   	'Language: ' +obj.Language+"\r\n"+
		   	'Plot: ' +obj.Plot+"\r\n"+
		   	'Actors: ' +obj.Actors+"\r\n"+
		   	'Rotten Tomatoes Rating: ' +obj.tomatoRating+"\r\n"+
		   	'Rotten Tomatoes URL: ' +obj.tomatoURL;
	   	console.log(mResponse)
	   	logE(mResponse);
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
    	//logs spotify responces into variable and logs it
    	var sResponse =
    		'Artist: ' +info.artists[0].name+"\r\n"+
    		'Song: ' +info.name+"\r\n"+
    		'Spotify URL: ' +info.external_urls.spotify+"\r\n"+
    		'Album the song is from: ' +info.album.name;
    	console.log(sResponse);
    	logE(sResponse);   
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
    	var sResponse =
    		'Artist: ' +info.artists[0].name+"\r\n"+
    		'Song: ' +info.name+"\r\n"+
    		'Spotify URL: ' +info.external_urls.spotify+"\r\n"+
    		'Album the song is from: ' +info.album.name;
    	console.log(sResponse);
    	logE(sResponse);   
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

	//logE logs everthing you ask liri to do in a txt flie, also a little math humour
	function logE(ln) {
  		fs.appendFile("./log.txt", ln, (error) => {
    	if(error) {
      	throw error;
    	}
  	})
	};
