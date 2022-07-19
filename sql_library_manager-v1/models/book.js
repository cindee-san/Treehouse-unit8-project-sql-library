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
      allowNull: false,
      validate: { 
        notNull: {
          msg: 'Please provide a value for "genre"',
        },
        notEmpty: {
          msg: 'Please provide a value for "genre"',
        }
      },
    },
    year: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        notNull: {
          msg: 'Please provide a value for "year"',
        },
        min: { 
          args: 1,
          msg: 'Please provide a value greater than "0" for "year"',
        },
      },
    },
  }, {
    sequelize,
    timestamps: false, // disable timestamps
    modelName: 'Book',
    paranoid: true, // enable "soft" deletes
  });
  return Book;
};