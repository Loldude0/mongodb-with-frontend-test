const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient
const bodyparser = require('body-parser');


//app stuff
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static('public'))
app.set('views', './pages');
app.set('view engine', 'ejs');

//main
MongoClient.connect("mongodb://localhost:27017/testdb", {useUnifiedTopology: true}, (err, client) => {

    if (err) return console.error(err) //catches errors
    console.log('Connected to Database')

    //database stuf
    const db = client.db();
    const collection = db.collection('testcollection');

    //index webpage
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/pages/index.html');
    })
    
    //webpage for the form
    app.get('/test', (req, res) => {
        res.sendFile(__dirname + '/pages/test.html');
    })
    
    //webpage where you can read everything
    app.get('/testread', (req, res) => {
        db.collection('testcollection').find().toArray()
        .then(results => {
            res.render('testread.ejs', { names: results})
        })
        .catch(error => console.log(error))
    })

    //webpage where you can delete
    app.get('/testdelete', (req, res) => {
        db.collection('testcollection').find().toArray()
        .then(results => {
            res.render('testdelete.ejs', { names: results})
        })
        .catch(error => console.log(error))
    })

    //endpoint for deleting
    app.delete('/testdeletedel', (req, res) => {
        db.collection('testcollection').deleteOne(
            { name: req.body.name }
        )
        .catch(error => console.error(error))
    })

    //endpoint for form submission
    app.post('/testform', (req, res) => {
        console.log(req.body);
        collection.insertOne(req.body)
        .then(result => {
            res.redirect('/test');
            console.log(result);
        })
        .catch(error => console.log(error))
    })

    //starts listening on the port specified
    app.listen(port, function() {
        console.log("initiated");
    })

  })


  /*
  prerequisites:
  node and npm should be installed
  express : npm install express --save
  nodemon :  npm install nodemon --save-dev
  body-parser : npm install body-parser --save
  mongodb : npm install mongodb --save
  ejs : npm install ejs --save

  do npm init after

  */