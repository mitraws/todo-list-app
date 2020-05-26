"use strict";

// const User = require("../models").user;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const Leo = await User.findOne({
    //   where: {
    //     name: "Leo",    
    //   }
    // })
    return await queryInterface.bulkInsert(
      "todolists",
      [
        {
          name: "George's Work list",
          // userId: Dan.get("id"),
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "George's Personal list",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leo's futbol list",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("todolists", null, {});
  },
};