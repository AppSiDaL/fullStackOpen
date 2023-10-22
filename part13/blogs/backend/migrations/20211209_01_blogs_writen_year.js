const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year_written", {
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
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year_written");
  },
};
