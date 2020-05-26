"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todoitems",
      [
        {
          task: "Have some dessert",
          deadline: "tomorrow",
          createdAt: new Date(),
          updatedAt: new Date(),
          todolistId: 1
        },
        {
          task: "Eat more veggies",
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