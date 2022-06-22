import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Timestamp } = require('firebase-admin/firestore');

export class Expense {
  constructor(id, date, description, ignored, value) {
    this.id = id;
    this.date = Timestamp.fromDate(date ? date : new Date());
    this.description = description;
    this.ignored = ignored;
    this.value = value;
  }

  toObject() {
    return {
      id: this.id,
      date: this.date,
      description: this.description,
      ignored: this.ignored,
      value: this.value,
    }
  }
}
