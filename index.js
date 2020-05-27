const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const TodoList = require("./models").todolist;
const User = require("./models").user;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on :${port}`));

app.use((req, res, next) => {
  console.log(req.method, req.path, req.body || req.params || req.query)
 next() 
});

//first exercise:
// app.post("/echo", (req, res) => {
//     res.json(req.body);
//   });

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

//fetch user based on id
app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    next(e);
  }
});

//update user by id
app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

// Create a new todolist
app.post("/todolists", async (req, res, next) => {
  try {
    const newList = await TodoList.create(req.body);
    res.json(newList);
  } catch (e) {
    next(e);
  }
});

//fetch todolists
app.get("/todolists", async (req, res, next) => {
  try {
    const todolist = await TodoList.findAll();
    res.json(todolist);
  } catch (e) {
    next(e);
  }
});

//update todolist
app.put("/todolists/:todolistId", async (req, res, next) => {
  try {
    const todolistId = parseInt(req.params.todolistId);
    const todoListToUpdate = await TodoList.findByPk(todolistId);
    if (!todoListToUpdate) {
      res.status(404).send("Todolist not found");
    } else {
      const updatedTodoList = await todoListToUpdate.update(req.body);
      res.json(updatedTodoList);
    }
  } catch (e) {
    next(e);
  }
});

//get all lists of one user
app.get("/users/:userId/todolists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    // console.log("WHATS USER????", user)
    if (user) {
      res.send(user.todolists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

//create a list for a user via /users/:userId/lists
app.post("/users/:userId/todolists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const newList = await TodoList.create({ userId, ...req.body });
      res.json(newList);
    }
  } catch (e) {
    next(e);
  }
});

// Update an existing list
app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toUpdate = await TodoList.findByPk(listId);
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

// Delete a user's list
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});
// Delete all user's lists
app.delete("/users/:userId/lists", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.TodoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});
