/*
Pesquise e estude uma biblioteca para requisições HTTP com JS/TypeScript.
Sugestões: axios, node-fetch, got, make-fetch-happen, needle, superagente,
cross-fetch, Wrap Up etc.
*/

import axios from 'axios';

interface EmployeeResponse {
  status: String;
  data: Employee;
}

interface Employee {
  id: number;
  employeeName: String;
	employeeSalary: number;
	employeeAge: number;
	profileImage: String;
}

axios.get<EmployeeResponse>('http://dummy.restapiexample.com/api/v1/employee/1')
  .then(reponse => {
    const employee = reponse.data.data;
    console.log(employee);
  }).catch(error => {
    console.error(error);
  });
  