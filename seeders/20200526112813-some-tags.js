'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "tag1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "tag2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "tag3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "tag4",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], 
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("tags", null, {});
  }
};
