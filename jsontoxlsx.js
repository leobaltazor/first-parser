var fs = require('fs');
var json2xls = require('json2xls');
 
fs.readFile('data190.json', 'utf8', function read (err, data) {
  if (err) console.log(err);
  fs.writeFile('data.xlsx', json2xls(JSON.parse(data)), 'binary');
});