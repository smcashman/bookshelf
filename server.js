var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app = express();
var router = express.Router();
var db;
var Book  = require('./public/app/models/books');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
    title: String,
    author: String,
    readBook: String,
    review: String,
    tags: String,
    
});

var Novel = mongoose.model('Novel', BookSchema);

mongoose.connect('mongodb://Admin1:Password1@ds111178.mlab.com:11178/bookshelf')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// add a book
	app.post('/books', function(req,res){

			book = new Novel({title: req.body.title,
							  author: req.body.author,
                              readBook: req.body.readName,
                              review: req.body.infoForm,
                              tags: req.body.tagsName
                });

 			book.save(function(err) {
            if (err)
                res.send(err);
            console.log(req.body.review)
            console.log(req.body.tags)
            //console.log(book)
            // res.json({ message: 'Book added!' });
            res.redirect('/');
        });   
    });
		
// get ALL THE BOOKS
    app.get('/books', function(req, res) {
    	Novel.find(function(err, books) {
      if (err)
        res.send(err);
      res.json(books);
    });
  });

    // get ONE book
	
	app.get('/books/:_id', function(req, res) {
    Novel.findById(req.params._id, function(err, book) {
      if (err)
        res.send(err);
      res.json(book);
    });
  })

// delete a book
	app.delete('/books/:_id', function(req, res){
    Novel.findByIdAndRemove(req.params._id, function(err, book) {
        if (err){
            return res.status(500).json({
               // message: 'Internal Server Error'
            });
        }
        res.status(201).json({
            message: 'Item was deleted'
        })
    })
})

//update a book
app.put('/books/:_id', function(req, res){
    var queryID = {_id: req.params._id}
   var updateThis = req.body;
    // console.log(updateThis)
    updatedbook = new Novel({title: req.body.title,
                author: req.body.author,
                read: req.body.read,
                review: req.body.review,
                tags: req.body.tags
                });
    console.log(req.params)
    console.log(req.body)
    Novel.findOneAndUpdate(queryID, updateThis,
     function(err, book){
        if (err){
            return res.status(500).json({
               // message: 'Internal Server Error'
            })
        }
        res.status(201).json({
            message: 'Item was updated'
        })
     })

 })


exports.app = app;

app.listen(process.env.PORT || 8080)

