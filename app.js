import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();
const PORT = 5000;

module.exports = app.listen();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/todos', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// get single todo
app.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'todo does not exist',
    });
  });
  
// create todos
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
   const todo = {
     id: db.length + 1,
     title: req.body.title,
     description: req.body.description
   }
   db.push(todo);
   return res.status(201).send({
     success: 'true',
     message: 'todo added successfully',
     todo
   })
  });

// edit todo
app.put('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let itemIndex;
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: id,
    title: req.body.title,
    description: req.body.description
  }
  db.map((todo, index) => {
    if (todo.id === id) {
      console.log(todo.id)
      console.log(index)
      itemIndex = index;
    }
  });
  db.splice(itemIndex, 1, todo);
  return res.status(201).send({
    success: 'true',
    message: 'todo update successfully',
    todo
  })
 });

// Delete todo
app.delete('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Todo deleted successfully',
       });
    }
  });

    return res.status(404).send({
      success: 'false',
      message: 'todo not found',
    });

 
});