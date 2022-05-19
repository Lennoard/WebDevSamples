import { Microblog } from './microblog.js';
import { Post } from './post/post.js';
import express from 'express';

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const microblog = new Microblog();

app.get('/', (req, res) => {
  res.send('<h1>Microblog server!</h1>');
});

app.get('/posts', (req, res) => {
  res.send(microblog.retrieveAll());
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = microblog.retrieve(id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = microblog.retrieve(id);
  if (post) {
    microblog.delete(post);
    req.status(204).send('Deletado');
  } else {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }
});

app.post('/posts', (req, res) => {
  const posts = microblog.retrieveAll();
  const newPostId = posts.length === 0 ? 0 : posts.length;
  
  const post = new Post(newPostId, req.body.text, 0);
  microblog.create(post);
  res.status(201).send(`Criado post: ${post}`);
});

app.put('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = microblog.retrieve(id);
  if (!post) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }

  const newPost = req.body.post;
  newPost.id = id;
  microblog.update(newPost);
  res.status(200).send();
});

app.patch('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = microblog.retrieve(id);
  if (!post) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }

  post.id = req.body.post.id;
  post.text = req.body.post.text;
  post.likes = req.body.post.likes;
  microblog.update(post);
  res.status(200).send();
});

app.patch('/posts/:id/like', (req, res) => {
  const id = req.params.id;
  const post = microblog.retrieve(id);
  if (!post) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }

  post.likes++;
  microblog.update(post);
  res.status(200).send();
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})