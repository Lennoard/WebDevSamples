var axios = require('axios');
var config = {
  method: 'get',
  url: 'https://www.mercadobitcoin.net/api/ETH/trades',
};

axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });