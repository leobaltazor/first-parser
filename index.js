var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

var URL = 'https://allo.ua/ru/products/mobile/klass-kommunikator_smartfon/p-1/';
var results = [];
var cards = [];
var page = [];
var con = 0;

var q = tress(function(url, callback){
    needle.get(url, function(err, res){
        if (err) throw err;

				var $ = cheerio.load(res.body);
				
				// $ = cheerio.load(body);
    
				$('.item').each(function(){
					cards.push({
							title:$('p.product-name-container',this).text().trim(),
							url:"https:" + $('a',this).attr('href').trim(),
							price:$('span.sum',this).text().trim(),
							priceNew:$('span.new_sum',this).text().trim(),
							instock:$('span.no-stock-message',this).text().trim()
					});
				});
				$('.toolbar-bottom .asd>.next.i-next').each(function(){
					page.push("https:" + $('a',this).attr('href'));
					q.push("https:" + $('a',this).attr('href'));
				}) 
// console.log(page);
// console.log(q);
con++
console.log(con);
if (con % 10 == 0) {
	fs.writeFileSync(`./data/data${con}.json`, JSON.stringify(cards, null, 4));
}

        callback();
    });
}, 10);

q.drain = function(){
    fs.writeFileSync(`./data.json`, JSON.stringify(cards, null, 4));
}

q.push(URL);