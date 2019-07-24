const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://khujwiali:Newuser123@khujwi-cluster-xfido.mongodb.net/test?retryWrites=true&w=majority";

// MongoClient.connect(uri,function(err,client){
//     console.log("DB Connected",db);
//     var cursor = db.collection('quotes').find()  
//     // db.close();
// })
var db;
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    console.log("Connected")
    db = client.db('MoviesDB') // whatever your database name is

    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("DB Connected")
//   console.log("collection",collection);
//   client.close();
// });

app.get('/',(req,res)=>{
    db.collection('Movie').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
      })
    // console.log("cursor",cursor)
    res.send("cursor")
});

// app.listen('3001',()=>console.log("Node Express Sever Started At PORT : 3001"));
