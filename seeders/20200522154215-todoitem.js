"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todoitems",
      [
        {
          task: "Have some dessert",
          important: false,
          deadline: "tomorrow",
          createdAt: new Date(),
          updatedAt: new Date(),
          todolistId: 1
        },
        {
          task: "Eat more veggies",
          important: true,
          deadline: "next week",
          createdAt: new Date(),
          updatedAt: new Date(),
          todolistId: 2
        },
        {
          task: "todoitem3",
          important: true,
          deadline: "next week",
          createdAt: new Date(),
          updatedAt: new Date(),
          todolistId: 2
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todoitems", null, {});
  },
};