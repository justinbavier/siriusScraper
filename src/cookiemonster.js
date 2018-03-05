/*==================================//
Gimme some cookies I'm FUCKIN hungry

Step 1) Get auth cookie.
	- Make a request to the homepage.
	- Store that cookie, SET TIMEOUT if necessary for the 'now-playing-live' cookie to come in (is this itself from a separare, auto-genned request??) 
	- Save / export that cookie for re-use in our API calls
	
Step 2) Get API data
	- Build array of URLs w/ ID of each chanel
	- Loop through all URLs, make request to API endpoint, include cookie
		=>	siriusRoutes.js is ALREADY doing the last part. 
		=>	Worth it to re-populate cookie jar, or just include these via string variables?
	- Store the json resonse and export to database.

Step 3) Export data to database.
	-	I have no idea what this looks like.
	

//==================================*/
const request = require('request');

// URLs (eventually dynamically generated)
let siriusUri = `https://player.siriusxm.com/rest/v2/experience/modules/tune/now-playing-live?ccRequestType=AUDIO_VIDEO&channelId=9356&hls_output_mode=none&marker_mode=all_separate_cue_points&result-template=web&time=1520199907074`
let siriusWelcomePage = `https://player.siriusxm.com/#/player/live`


function getCookies(callback){	// Make a request to sirius homepage, secure cookie for API calls.
	
	console.log("======================== INSIDE getCookies =======================");

	request(siriusWelcomePage, function (error, response, body) {	// Request the welcome page.
			if (!error && response.statusCode == 200) {
				
				our_cookies = response.headers['set-cookie'];
				console.log('WE HAVE COOKIES:');
				console.log(our_cookies);
				
				
				// BEGIN STOLEN CODE from siriusRoutes.js
				
				// Start requesting API endpoints.
				const options = {
					method: 'GET',
					// uri: {
					// 	siriusUri
					// },
					uri: siriusUri,
					headers: {
						Cookie: our_cookies
					},
					json: true
				};
				
				console.log("about to try the endpoint");
				
				request(options).then(function(response) {		// Error thrown here...
					
					console.log("we have a response.");
					
					const timeInMils = new Date().getTime();
					const scrapedFilename = './json/gorilla_scrape-'+timeInMils+'.json';
					
					const fileData = JSON.stringify(response);
					// change filename by timestamp
					fs.writeFile(scrapedFilename, fileData, 'utf8', function(err) {
						if (err) {
							return console.log(err);
						}
						console.log('The file was saved as '+scrapedFilename+'!');
					});
					// Print file data to the page.
					return res.send(fileData);
				})
				.catch(function(err) {
					console.log(err);
				});
				
				
			// END IF no error and response.statusCode == 200
			} else {
					return callback(error);
			}
	});
}

getCookies(function(err, res){
	if(!err)
		 console.log(res);
	else console.log(err)
});






// TRASH HEAP: Might be some useful examples here.


// ===== THIS WORKS GREAT, it will visit the URL and return the cookies from that url.


// var http = require( "http" );
// var url = require( "url" );

// var cookies_out = [];

// var urlstring = siriusWelcomePage;
// var parsedurl = url.parse( urlstring );
// var options = {
//   hostname: parsedurl.hostname,
//   port: ( parsedurl.port || 80 ), // 80 by default
//   method: 'GET',
//   path: parsedurl.path,
//   headers: { },
// };

// console.log("====================");
// console.log("  Request started!");
// console.log("====================");

// var request = http.request(
//   options,
//   function ( response ) {
//     // display returned cookies in header
//     var setcookie = response.headers["set-cookie"];
//     if ( setcookie ) {
//       setcookie.forEach(
//         function ( cookiestr ) {
//           console.log( cookiestr );
//         }
//       );
//     }

//     var data = "";
//     response.on(
//       "data",
//       function ( chunk ) { data += chunk; }
//     );

//     response.on(
//       "end",
//       function () {
//         console.log( "STATUS:" + response.statusCode );
//         // console.log( "  DATA:" + data );
//       }
//     );
//   }
// );

// request.on(
//   "error",
//   function( err ) {
//     console.error( "ERROR:" + err );
//   }
// );


// console.log(request);


// request.end(); // let request know it is finished sending





//	==> This worked, it just printed the page source, which is useless because we are running inside an angular app.

// const https = require('https');

// https.get(siriusWelcomePage, (resp) => {
	
// 	console.log("inside the get request");
//   let data = '';
 
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
 
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
// 		console.log("we are json parsing the data");
//     console.log((data));
//   });
 
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

