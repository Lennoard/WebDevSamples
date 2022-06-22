import { getFirestore } from 'firebase-admin/firestore';
import { initFirebase } from './firebase-init.js';
var db;
var col;

export class ExpenseManager {

  constructor() {
    initFirebase();
    db = getFirestore();
    col = db.collection('expenses-example');
  }

  async create(expense) {
    var doc = expense.id ? col.doc(expense.id) : col.doc();
    expense.id = doc.id;
    return await doc.set(expense);
  }

  async retrieve(id) {
    const snapshot = await col
      .where('id', '==', id)
      .orderBy('date', 'desc')
      .get();

    return snapshot.docs[0];
  }

  async update(expense) {
    return await col.doc(String(expense.id)).update(expense);
  }

  async delete(expense) {
    return await col.doc(String(expense.id)).delete();
  }

  async retrieveExpenses() {
    let expenses = [];
    let snapshot = await col
      .orderBy('id', 'asc')
      .orderBy('date', 'desc')
      .get();
    
    snapshot.forEach(doc => {
      expenses.push(doc.data());
    });

    return expenses;
  }
}
