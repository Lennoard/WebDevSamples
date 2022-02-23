/*
Crie um programa que receba uma URL e execute um método GET exibindo
como saída alguns elementos como: Status code, Encoding, O tamanho da
resposta, O corpo da resposta, dentre outros
*/

import * as readline from 'readline';
import axios, { AxiosResponse } from 'axios';

let streamInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function performGet(url: string) {
  axios.get(url).then(response => {
    detailResponse(response);
  }).catch(error => {
    console.error(error);
  });
}

function detailResponse(response: AxiosResponse<any, any>) {
  console.log(`Status code: ${response.status}`);
  console.log(`Corpo da resposta: ${response.data.substring(0, 1000)}`);
  console.log(`Headers: ${response.config.headers}`);
  console.log(response.config);
}

streamInterface.question('Insira uma URL: http://', url => {
  performGet(`http://${url}`);
  streamInterface.close();
});
  