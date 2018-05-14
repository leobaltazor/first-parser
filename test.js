var request = require("request");

var options = { method: 'POST',
  url: 'https://proschet.branderstudio.com/widget/5a8e99bbe5c916d54c97aa47/calculate',
  headers: 
   { 'postman-token': '23a27258-3996-c275-a17c-f7a6e6f1f43d',
     'cache-control': 'no-cache',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData: 
   { product: '594e6e8b2388496d2709709c',
     appearance: '2',
     equipment: '1' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(JSON.parse(body).product.name + " цена нового " + JSON.parse(body).price);
  // console.log(JSON.parse(body).Map(body));
});
