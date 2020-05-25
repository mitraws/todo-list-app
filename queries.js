const User = require("./models").user;
const TodoItem = require("./models").todoitem;


// async function getUsers() {
//     const allUsers = await User.findAll();
//     return allUsers.map(user => user.get({ plain: true }));
//     // Searches for all users and logs them.
// }

// getUsers().then(users => console.log(users));


// async function getTodoItems() {
//     const TodoItems = await TodoItem.findAll();
//     return TodoItems.map(item => item.get({ plain: true }));
//     // Searches for all TodoItems and logs them (use plain: true).
// }

// getTodoItems().then(result => console.log(result));


// async function getUserByPk(key) {
//     const user = await User.findByPk(key);
//     return user ? user.get({ plain: true }) : "Not found!";
//   }    
//   getUserByPk(2).then(result => console.log(result));
// // Searches for a user by primary key.

async function newUser({ name, email, phone }) {
    const newUser = await User.create({ name, email, phone });
      return newUser.get({ plain: true });
    // Creates a new user. (Once you manage to create this user, 
    // delete or comment the function call as to no run it again, 
    // if not we we'll get an error).
}
newUser().then(result => console.log(result));

// async function importantTodos() {
//     const importantTodo = await TodoItem.findAll({
//         where: {
//         important: true,
//         }});
//         return importantTodo.map(todo => todo.get({ plain: true }));
//     // Searches only for important TodoItems
// }

// importantTodos().then(result => console.log(result));
