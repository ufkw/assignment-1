var http = require('http');
	fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  //var path = '/listings';
  

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
   
   if( request.method == 'GET' && parsedUrl.pathname == '/listings'){		
		//send listingData in JSON format
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(JSON.stringify(listingData));
		response.end();
   }
   else{
	   send404Response(response);
   }
   
};

//404 error
function send404Response(response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Bad gateway error");
	response.end();
}

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   
   if (err) throw err;
   listingData = JSON.parse(data);
   
   //should start server
   server = http.createServer(requestHandler);
   server.listen(8080);
   console.log('Server listening on: http://localhost:' + port);
   
});



