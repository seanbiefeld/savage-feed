var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.michaelsavage.wnd.com/';

request(url, function(error, response, body) {
	if (error)
		throw error;
	$ = cheerio.load(body);
	console.log(body);
});