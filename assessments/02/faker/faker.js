var axios = require('axios');
var config = {
  method: 'get',
  url: 'https://fakerapi.it/api/v1/persons?_locale=pt_BR',
};

axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });