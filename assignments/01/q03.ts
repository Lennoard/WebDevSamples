/*
Crie um programa em que permita baixar, via HTTP e usando o método GET,
um arquivo de imagem (escolha um tipo apenas - jpg ou gif...):
- Passe como parâmetro o "endereço WEB" completo até o arquivo;
- Receba o corpo a resposta em formato binário;
- Salve em disco a imagem.
*/

import { createWriteStream } from 'fs';
import * as readline from 'readline';
import axios, { AxiosResponse } from 'axios';

let streamInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function performGet(url: string) {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  processResponse(response);
}

function processResponse(response: AxiosResponse<any, any>) {
  const writeStream = response.data.pipe(createWriteStream('imagem.png'));
  writeStream.on('finish', () => {
    console.log('Imagem salva');
  });
}

streamInterface.question('Insira a URL de uma imagem PNG: ', url => {
  if (!url.endsWith('png')) {
    console.error('Formato inválido');
    return;
  }
  performGet(url);
  streamInterface.close();
});
  