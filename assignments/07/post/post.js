import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Timestamp } = require('firebase-admin/firestore');

export class Post {
  constructor(id, text, likes, date) {
    this.id = id;
    this.text = text;
    this.likes = likes;
    this.date = Timestamp.fromDate(date ? date : new Date());
  }

  toObject() {
    return {
      id: this.id,
      text: this.text,
      likes: this.likes,
      date: this.date
    }
  }
}
