import express from 'express';
import { ExpenseManager } from './expensemanager.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const expensesManager = new ExpenseManager();

app.get('/', (req, res) => {
  res.send('<h1>Server is up and running!</h1>');
});

app.get('/expenses', async (req, res) => {
  res.send(await expensesManager.retrieveExpenses());
});

app.get('/expense/:id', async (req, res) => {
  const id = req.params.id;
  const expense = await expensesManager.retrieve(id);
  if (expense) {
    res.send(expense);
  } else {
    res.status(404).send(`Nenhuma despesa encontrada com id "${id}"`);
  }
});

app.delete('/expense/:id', async (req, res) => {
  const id = req.params.id;
  const expense = await expensesManager.retrieve(id);
  if (expense) {
    expensesManager.delete(expense);
    req.status(204).send('Deletado');
  } else {
    res.status(404).send(`Nenhuma despesa encontrada com id "${id}"`);
  }
});

app.post('/expense', (req, res) => {
  // { "expense": {} }

  const expense = req.body.expense;

  expensesManager.create(expense).then(() => {
    res.status(200).send(JSON.stringify(expense));
  }).catch(e => {
    res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
  });
});

app.patch('/expense/:id', async (req, res) => {
  // { "post": {} }

  const id = req.params.id;
  const expense = await expensesManager.retrieve(id);
  if (!expense) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }

  expense.id = req.body.expense.id;
  expense.description = req.body.expense.description;
  expense.value = req.body.expense.value;
  expensesManager.update(expense);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
