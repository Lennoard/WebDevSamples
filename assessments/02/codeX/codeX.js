var axios = require('axios');
var data = JSON.stringify({
  "code": `public class program {
            public static void main(String [] args) {
              System.out.println(5+5+6);
            }
          }`,
  "language": "java",
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