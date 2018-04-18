var request = require('request');
const cheerio = require('cheerio');
var tress = require('tress');
var needle = require('needle');
var fs = require('fs');

var page = [];
var cards = [];

var url = "https://allo.ua/ru/products/mobile/klass-kommunikator_smartfon/p-1/";

page.push(url)

var k = 0;

	
function re(x) {
	
	page = x;

request(page[page.length-1], function(err, res, body){
  if(err){console.log(err);}
  else{ 
    $ = cheerio.load(body);
    
    $('.item').each(function(){
      cards.push({
          title:$('p.product-name-container',this).text().trim(),
					url:$('a',this).attr('href').trim(),
					price:$('span.sum',this).text().trim(),
					priceNew:$('span.new_sum',this).text().trim()
      });
		});
		$('.toolbar-bottom .asd>.next.i-next').each(function(){
			page.push("https:" + $('a',this).attr('href'));
		}) 
	}

url = page[page.length-1];
console.log(cards);
console.log(page);
console.log(url);
fs.writeFileSync('./data.json', JSON.stringify(cards, null, 4));
})
}

re(page)

