var Request = require('request'),
Cheerio = require('cheerio'),
url = 'http://www.michaelsavage.wnd.com/',
Feed = require('feed'),
express = require('express'),
app = express(),
returnData = "test",
feedResponse;

app.get('/frontpage', function(req, res){

	getFeedData(function(data){
	
		res.setHeader('Content-Type', 'text/xml');
		res.end(data);
	
	});	
	
});

function getFeedData(callback) {

	
	Request(url, function(error, response, body) {
		
		if (error)
			returnData = error;
			
		$ = Cheerio.load(body);
		
		var articles = $('article');
		var iconSource = $('link[rel="apple-touch-icon"]').attr('href');
		var description = $('meta[name="description"]').attr('content');
		var author = $('meta[name="author"]').attr('content');
		var copyright = $('meta[name="Copyright"]').attr('content');
		
		var feed = new Feed({
			title:          description,
			description:    description,
			link:           'http://www.michaelsavage.wnd.com/',
			image:          iconSource,
			copyright:      copyright,

			author: {
				name:       author
			},
			
		});
		
		feed.category('News');
		feed.category('Michael Savage');
		feed.category('Savage');
		
		articles.each(function(index, article) {
			
			var articleHeader = $(this).find('h2');		
			
			if(articleHeader) {
				
				var articleTitle = articleHeader.children().first().text();
				var articleLink = articleHeader.children().first().attr('href');
				var imageSource = $(this).find('img').attr('src');
				var articleDescription = $(this).find('p').first().text();
				
				if(articleDescription && articleLink && imageSource && articleDescription) {
			
					feed.item({
					
						title:			articleTitle || '',
						link:			articleLink || '',
						description: 	articleDescription || '',
						image: 			imageSource || '',
						date:			new Date()
					
					});
			
					//console.log(articleTitle);
					//console.log(articleDescription);
					//console.log(articleLink);
					//console.log(imageSource);
					//console.log('---------------------------------------\r\n');
			
				}
				
			}
		});
		
		callback(feed.render());
	});
}



app.listen(process.env.PORT || 3000);