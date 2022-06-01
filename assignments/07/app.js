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

app.get('/posts', async (req, res) => {
  const page = req.query.page ? req.query.page : 1
  const offset = req.query.offset;
  const limit = req.query.limit;

  if (offset && limit) {
    res.send(await microblog.retrieveByOffset(parseInt(limit), parseInt(offset)));
  } else {
    res.send(await microblog.retrieveAll(page));
  }
});

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await microblog.retrieve(id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }
});

app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await microblog.retrieve(id);
  if (post) {
    microblog.delete(post);
    req.status(204).send('Deletado');
  } else {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }
});

app.post('/posts', (req, res) => {
  // { "text": "" }

  microblog.getLatest().then(latestPost => {
    const newPostId = parseInt(latestPost.id) + 1;
    const post = new Post(newPostId, req.body.text, 0).toObject();
    microblog.create(post).then(() => {
      res.status(201).send(`Criado post: ${post}`);
    }).catch(e => {
      res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
    });
  }).catch(e => {
    res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
  });
});

app.put('/posts/:id', (req, res) => {
  // { "post": {} }

  const id = req.params.id;
  const newPost = req.body.post;
  newPost.id = id;

  microblog.create(newPost).then(() => {
    res.status(200).send();
  }).catch(e => {
    res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
  });
});

app.patch('/posts/:id', async (req, res) => {
  // { "post": {} }

  const id = req.params.id;
  const post = await microblog.retrieve(id);
  if (!post) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
  }

  post.id = req.body.post.id;
  post.text = req.body.post.text;
  post.likes = req.body.post.likes;
  microblog.update(post);
  res.status(200).send();
});

app.patch('/posts/:id/like', async (req, res) => {
  const id = req.params.id;
  const post = await microblog.retrieve(id);
  if (!post) {
    res.status(404).send(`Nenhum post encontrado com id "${id}"`);
    return
  }

  post.likes++;
  microblog.update(post).then(() => {
    res.status(200).send();
  }).catch(e => {
    res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
  });
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    res.status(400).send(`parâmetro 'q' é necessário`);
    return
  }

  microblog.search(searchQuery).then(posts => {
    res.status(201).send(posts);
  }).catch(e => {
    res.status(500).send(`Erro do firebase: [${e}] ${e.message}`);
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
