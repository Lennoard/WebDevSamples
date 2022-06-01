import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { initFirebase } from './firebase-init.js';
var db;
var postsCollection;

export class Microblog {

  constructor() {
    initFirebase();
    db = getFirestore();
    postsCollection = db.collection('users-exaple')
      .doc('default-user')
      .collection('posts');
  }

  async create(post) {
    return await postsCollection.doc(String(post.id)).set(post);
  }

  async retrieve(id) {
    let posts = await this.retrieveAll();
    let post = [];

    posts.forEach(p => {
      if (p.id == id) {
        post = p;
      }
    });

    return post;
  }

  async update(newPost) {
    return await postsCollection.doc(String(newPost.id)).update(newPost);
  }

  async delete(post) {
    return await postsCollection.doc(String(post.id)).delete();
  }

  async retrieveAll() {
    let posts = [];
    const snapshot = await postsCollection.get();
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });

    return posts;
  }

}
