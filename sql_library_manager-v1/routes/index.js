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
    var findAllBooks = await Book.findAll();
    res.render('index', { findAllBooks });
  }));

//shows the create new book form
router.get('/books/new', function(req, res){
  res.render('new-book', { book: Book.build(), title: 'new book'})
});

//posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try{
    book = await Book.create(req.body)
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render('new-book', { book, error, title: 'new book'}) 
    } else {
      throw error;
    }
  }
}));

//shows book detail form for updating/deleting

router.get('/books/:id', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render('update-book', {book, title: book.title});
  } else {
    res.render('page-not-found');
  }
  
}));

//updates book info in database

router.post('/books/:id', asyncHandler(async(req, res) => {
  let book;
  try{ 
    book = await Book.findByPk(req.params.id);
    if(book){
      await book.update(req.body);
      res.redirect('/books');
    } else{
      res.render('page-not-found');
    }
  } catch(error) {
    if (error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', {book, error, title: book.title})
    } else {
      throw error;
    }
  }
  
}));

router.post('/books/:id/delete', asyncHandler(async(req, res) =>{
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}))
module.exports = router;
