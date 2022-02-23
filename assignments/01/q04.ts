/*
Crie um aplicativo que receba uma URL de uma página WEB como entrada e
execute uma chamada usando o método GET para a URL e efetue um "parse"
na página obtida e exibindo todos os links presentes na página: atributos href
contidos dentro de tags <a></a>

Ex de link: <a href="http://www.google.com">Página do Google</a>
Dica: use expressões regulares.
*/

import * as readline from 'readline';
import axios, { AxiosResponse } from 'axios';

let streamInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function performGet(url: string) {
  axios.get(url).then(response => {
    parseResponse(response);
  }).catch(error => {
    console.error(error);
  });
}

function parseResponse(response: AxiosResponse<any, any>) {
  const body = response.data as string;
  const regex: RegExp = /href\s*=\s*(['"])(https?:\/\/.+?)\1/gi;
  let link: RegExpExecArray | null;

  while ((link = regex.exec(body)) !== null) {
    console.log(link[2]);
  }
}

streamInterface.question('Insira uma URL: http://', url => {
  performGet(`http://${url}`);
  streamInterface.close();
});
  