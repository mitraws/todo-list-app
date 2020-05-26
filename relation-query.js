const { user, todoitem, todolist } = require("./models");

async function listsWithUsers() {
  const lists = await todolist.findAll({
    include: [user],
    //return all user attributes from each todolist
    include: [{ model: user, attributes: ["name"] }], 
    //return only the name of Users from each todo list
  });

  return lists.map(list => list.get({ plain: true }));
}

// listsWithUsers().then(lists => console.log(lists));

async function getUsers() {
    const allUsers = await user.findAll({
      include: { model: todolist, attributes: ["name"] },
    });
    return allUsers.map(user => user.get({ plain: true }));
    // return allUsers.map(user => user.get({ plain: true }).todolists);
    //return the name of todolists from all users 

  }
  
//   getUsers().then(users => console.log(users));
// getUsers().then(users => console.log(users[1].todolists)); 

async function getUserWithList(id) {
    const result = await user.findByPk(id, { include: [todolist] });
    return result.get({ plain: true });
    //return todolist from one user by id
  }
  
//   getUserWithList(1).then(user => console.log("user by id with lists", user));
  
  async function imporantTodos() {
    const todos = await todoitem.findAll({
      where: { important: true },
      include: { model: todolist, attributes: ["name"] }
    });
    return todos.map(item => item.get({ plain: true }));
    //return important todoitems with the name of todolist  
  }
  
//   imporantTodos().then(items => console.log("important todoItems", items));
  
  async function fullUserById(id) {
    const result = await user.findByPk(id, {
      include: [
        {
          model: todolist,
          attributes: ["name"],
          include: { model: todoitem, attributes: ["task"] }
        }
      ]
    });
    return result.get({ plain: true });
    //return user with todolist name and todoitem task based on id
  }
  
//   fullUserById(1).then(user => console.log("User with tasks", user));
  
  // Many to many query
  
  async function itemsWithTags() {
    const items = await todoItem.findAll({ include: [tag] });
    return items.map(item => item.get({ plain: true }));
  }
  
  // itemsWithTags().then(items => console.log("items with tags", items));