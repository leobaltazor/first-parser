var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');
var json2xls = require('json2xls');

var URL = 'https://allo.ua/ru/products/mobile/klass-kommunikator_smartfon/p-1/';
var results = [];
var cards = [];
var page = [];
var con = 0;

var q = tress(function (url, callback) {
	needle.get(url, function (err, res) {
		if (err) throw err;

		var $ = cheerio.load(res.body);


		$('.item').each(function () {
			cards.push({
				title: $('p.product-name-container', this).text().trim(),
				url: "https:" + $('a', this).attr('href').trim(),
				price: $('span.sum', this).text().trim(),
				priceNew: $('span.new_sum', this).text().trim(),
				instock: $('span.no-stock-message', this).text().trim(),
				markdown: $('span.text-labels ucenka', this).text().trim()
			});
		});
		$('.toolbar-bottom .asd>.next.i-next').each(function () {
			// page.push("https:" + $('a',this).attr('href'));
			q.push("https:" + $('a', this).attr('href'));
		})
		// console.log(page);
		// console.log(q);
		con++
		console.log(con);
		if (con == 143) {
			// fs.writeFileSync(`./data/data${con}.json`, JSON.stringify(cards, null, 4));
			// fs.writeFileSync(`./data//data${dateNow()}.json`, JSON.stringify(cards, null, 4));
			fs.writeFileSync(`./data//data${dateNow()}.xlsx`, json2xls(JSON.parse(JSON.stringify(cards, null, 4))), 'binary');
			con = 0;
		}

		callback();
	});
}, 1);

q.drain = function () {
	fs.writeFileSync(`./data//data${con}.json`, JSON.stringify(cards, null, 4));
	// fs.writeFile(`./data/data.json`, JSON.stringify(cards, null, 4));
	// fs.writeFile('./data/data.xlsx', json2xls(JSON.parse(cards)), 'binary');
}

q.push(URL);

function dateNow() {
	var d = new Date();
	var date = "";
	var YYYY = d.getFullYear();
	var MM = d.getUTCMonth() + 1;
	var DD = d.getDate();
	var H = d.getHours();
	var M = d.getMinutes();
	var S = d.getSeconds();

	if (MM > 0 && MM < 10) {
		MM = "0" + MM;
	}
	if (DD > 0 && DD < 10) {
		DD = "0" + DD;
	}
	if (H > 0 && H < 10) {
		H = "0" + H;
	}
	if (M > 0 && M < 10) {
		M = "0" + M;
	}
	if (S > 0 && S < 10) {
		S = "0" + S;
	}
	date = YYYY + "-" + MM + "-" + DD + "-" + H + "." + M + "." + S;
	return date
}
