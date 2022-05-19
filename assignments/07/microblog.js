export class Microblog {
  #posts;

  constructor() {
    this.#posts = [];
  }

  create(post) {
    this.#posts.push(post);
  }

  retrieve(id) {
    return this.#posts.find(post => post.id == id);
  }

  update(newPost) {
    const post = this.retrieve(newPost.id);
    if (!post) return;

    post.text = newPost.text;
    post.likes = newPost.likes;

    const index = this.#posts.indexOf(post);
    this.#posts[index] = post;
  }

  delete(post) {
    const p = this.retrieve(post.id);
    if (p) {
      this.#posts.pop(p);
    }
  }

  retrieveAll() {
    return this.#posts;
  }

}
