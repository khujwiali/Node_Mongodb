const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
const uri = process.env.MONGODB_URI;
let db;

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  console.log("Connected")
  db = client.db('MoviesDB') // whatever your database name is

  app.listen(process.env.PORT, () => {
    console.log('listening on '+process.env.PORT);
    })
});

app.get('/read',(req,res)=>{
  db.collection('Movie').find().toArray(function(err, results) {
    if(err) return console.log(err)
    console.log(results)
    res.send(results);
  })
});

app.post('/create',(req,res)=>{
  console.log(req.body);
  db.collection('Movie').save(req.body,(err, result)=>{
    if(err) return console.log(err)
    console.log('Created Successfully');
    res.send('Created Successfully');
  })
});

app.put('/update', (req, res) => {
  if(!req.query) return res.send("No key found for update")
  console.log("movie_id",req.query.movie_id);
  console.log("req.body",req.body);
  db.collection('Movie')
  .findOneAndUpdate({movie_id: req.query.movie_id}, {
    $set: {
      name: req.body.name
    }
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    console.log("put result",result)
    res.send("Updated Successfully");
  })
})

app.delete('/delete', (req, res) => {
  db.collection('Movie').findOneAndDelete({movie_id: req.body.movie_id},
  (err, result) => {
    if (err) return res.send(500, err)
    console.log("delete result",result);
    res.send("Deleted Successfully");
  })
})