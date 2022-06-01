import { query } from 'express';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { initFirebase } from './firebase-init.js';
var db;
var postsCollection;

const MAX_RESULTS_PER_PAGE = 5

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
    const snapshot = await postsCollection
      .where('id', '==', id)
      .orderBy('date', 'desc')
      .limit(MAX_RESULTS_PER_PAGE).get();

    return snapshot.docs[0];
  }

  async update(newPost) {
    return await postsCollection.doc(String(newPost.id)).update(newPost);
  }

  async delete(post) {
    return await postsCollection.doc(String(post.id)).delete();
  }

  async retrieveAll(page) {
    let posts = [];
    let snapshot = null;
    if (!page || page <= 1) {
      snapshot = await postsCollection
        .orderBy('id', 'asc')
        .orderBy('date', 'desc')
        .limit(MAX_RESULTS_PER_PAGE).get();
    } else {
      snapshot = await postsCollection
        .orderBy('id', 'asc')
        .orderBy('date', 'desc')
        .startAt(MAX_RESULTS_PER_PAGE * (page - 1))
        .limit(MAX_RESULTS_PER_PAGE).get();
    }
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });

    return posts;
  }

  async retrieveByOffset(limit, offset) {
    let posts = [];
    const snapshot = await postsCollection
      .orderBy('id', 'asc')
      .orderBy('date', 'desc')
      .startAt(offset)
      .limit(limit).get();
    
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });

    return posts;
  }

  async search(searchQuery) {
    let posts = [];
    const snapshot = await postsCollection
      .where('text', 'in', [searchQuery])
      .orderBy('date', 'desc')
      .get();
    
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });

    return posts;
  }

  async getLatest() {
    const snapshot = await postsCollection
      .orderBy('id')
      .limitToLast(1).get();

    return snapshot.docs[0];
  }

}
