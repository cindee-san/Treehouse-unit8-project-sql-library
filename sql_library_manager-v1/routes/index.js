var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
    var findAllBooks = await Book.findAll({
      // order: [["createdAt", "DESC"]]
    });
    console.log(findAllBooks);
    res.render('index', { findAllBooks });
  });

module.exports = router;
