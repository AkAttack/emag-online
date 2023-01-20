const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./assets/QuoteTemplate')

const { connectToDB, getDB} = require('./db')
const {ObjectId} = require('mongodb')

const app = express()
app.use(express.json())
const port= process.env.PORT || 3001;

//bypass localhost restrictions for React.js
app.use(cors());
app.use(function(req, res, next) {
	// update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res)=>{
	pdf.create(pdfTemplate(req.body), {})
		.toFile('result.pdf', (err)=>{
			if(err){res.send(Promise.reject())};
			//if no err send pdf
			res.send(Promise.resolve());
		});

}) 

app.get('/fetch-pdf', (req,res)=>{
	res.sendFile(`${__dirname}/result.pdf`)
})

//db connection
let db
connectToDB((err)=>{
	if(!err){
		console.log('DB Connected')
	}
	db = getDB()
})

app.listen(port, console.log('listening on PORT ', port))

//db route
app.get('/books', (req,res)=>{
	const page = req.query.page || 0
	const booksPerPage = 3
	let books = []
	db.collection('books')
		.find()
		.sort({author: 1})
		.skip(page * booksPerPage)
		.limit(booksPerPage)
		.forEach(book => books.push(book))
		.then(()=>{
			res.status(200).json(books)
		})
		.catch(()=>{
			res.status(500).json({error: 'could not fetch documents'})
		})

})

//get single book
app.get('/books/:id', (req,res)=>{
	if(ObjectId.isValid(req.params.id)){
		db.collection('books')
			.findOne({_id: ObjectId(req.params.id)})
			.then(doc=>{
				res.status(200).json(doc)
			})
			.catch(err=>{
				res.status(500).json({error: 'could not find that document'})
			})
	} else{
		res.status(500).json({error: 'not a valid ID'})
	}
})

//handle db post request
app.post('/books', (req,res)=>{
	const book= req.body
	db.collection('books')
		.insertOne(book)
		.then(result =>{
			res.status(200).json(result)
		})
		.catch(err=>{
			res.status(500).json({err: 'could not create new Book'})
		})
})

//handle delete request
app.delete('/books/:id', (req, res)=>{
	if(ObjectId.isValid(req.params.id)){
		db.collection('books')
			.deleteOne({_id: ObjectId(req.params.id)})
			.then(result=>{
				res.status(200).json(result)
			})
			.catch(err=>{
				res.status(500).json({error: 'could not Delete document'})
			})
	} else{
		res.status(500).json({error: 'not a valid ID'})
	}
})

//PATCH request
app.patch('/books/:id', (req, res)=>{
	const updates = req.body
	if(ObjectId.isValid(req.params.id)){
		db.collection('books')
			.updateOne({_id: ObjectId(req.params.id)}, {$set: updates} )
			.then(result=>{
				res.status(200).json(result)
			})
			.catch(err=>{
				res.status(500).json({error: 'could not Update document'})
			})
	} else{
		res.status(500).json({error: 'not a valid ID'})
	}
})

// to index db
//db.books.createindex({rating: 8})

//check current indexs
//db.books.getindexes()

//drop index
//db.books.dropIndex({rating: 8})