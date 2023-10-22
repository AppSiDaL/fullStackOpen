const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    year_written: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: "Written Year must be a number.",
        },
        min: {
          args: 1991,
          msg: "Written year must be equal or bigger than 1991",
        },
        max: {
          args: new Date().getFullYear(),
          msg: `The written year cant be bigger tan the actual year (${new Date().getFullYear()}).`,
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
);
module.exports = Blog;
