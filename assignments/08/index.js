window.onload = () => {
  document.getElementById('submit').addEventListener('click', crateExpense);
  loadExpenses();
}

function listExpense(expense) {
  let expenseContainer = document.getElementById('expense-container');
  let html = `
    <li class="collection-item">
      <h6 class="black-text">${expense.description}</h6>
      <p>Valor: R$${expense.value}</p>
      <p>${new Date(expense.date._seconds * 1000).toLocaleDateString()}</p>
    </li>
  `
  expenseContainer.innerHTML += html;
}

async function loadExpenses() {
  const response = await fetch('http://localhost:3000/expenses');
  const expenses = await response.json();

  expenses.forEach(expense => {
    listExpense(expense);
  });
}

async function crateExpense() {
  const expense = {
    "expense": {
      date: new Date(document.getElementById('date').value),
      description: document.getElementById('description').value,
      ignored: document.getElementById('ignore').checked,
      value: parseFloat(document.getElementById('value').value),
    }
  };

  const config = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expense)
  }

  const response = await fetch('http://localhost:3000/expense', config);
  const newExpense = await response.json();
  console.log(newExpense);
  listExpense(newExpense);
}