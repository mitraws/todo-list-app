'use strict';
module.exports = (sequelize, DataTypes) => {
  const todolist = sequelize.define('todolist', {
    name: DataTypes.STRING
  }, {});
  TodoList.associate = function(models) {
    // associations can be defined here
  };
  return todolist;
};