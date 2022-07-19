var express = require('express');
const book = require('../models/book');
var router = express.Router();
var Book = require('../models').Book;

//Handler function to wrap each route

function asyncHandler(cb){
  return async(req, res, next) => {
    try{
      await cb(req,res,next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/books');
});

//shows full list of books
router.get('/books', asyncHandler(async(req, res, next) => {
    var findAllBooks = await Book.findAll({
      // order: [["createdAt", "DESC"]]
    });
    res.render('index', { findAllBooks });
  }));

//shows the create new book form
router.get('/books/new', function(req, res){
  res.render('new-book', { book: Book.build(), title: 'new book'})
});

//posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  console.log(req.body);
  const newBook = await Book.create(req.body)
  console.log(newBook);
  res.redirect('/books/' + book.id);
}));





module.exports = router;
