var Request = require('request'),
Cheerio = require('cheerio'),
url = 'http://www.michaelsavage.wnd.com/',
Feed = require('feed');

Request(url, function(error, response, body) {
	if (error)
		throw error;
	$ = Cheerio.load(body);
	
	var articles = $('article');
	
	articles.find('a').each(function(index, link) {
		console.log($(this).attr('href'));
	});
});