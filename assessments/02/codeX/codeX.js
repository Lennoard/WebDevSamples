var axios = require('axios');
var data = JSON.stringify({
  "code": `
  fun main() {
    val text = buildString {
      append("preço: ")
      append(450000)
    }
    print(text)
  }
  `,
  "language": "kt",
  "input": ""
});

var config = {
  method: 'post',
  url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });