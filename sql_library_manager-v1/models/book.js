'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false, //disallow null
      validate: { 
        notNull: {
          msg: 'Please provide a value for "Title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "Title"',
        }
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false, //disallow null
      validate: { 
        notNull: {
          msg: 'Please provide a value for "Author"',
        },
        notEmpty: {
          msg: 'Please provide a value for "Author"',
        }
      },
    },
    genre: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type:DataTypes.INTEGER,
      allowNull: true,
     
    },
  }, {
    // timestamps: true, // disable timestamps
    // tableName: 'Books',
    modelName: 'Book',
    // paranoid: false, // enable "soft" deletes
    sequelize
  });
  return Book;
};