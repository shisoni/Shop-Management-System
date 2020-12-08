const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const http = require("http");
const mongoose = require('mongoose');
const { data } = require("jquery");
const { APP_ID } = require("@angular/core");
const CONNECTION_URL = "mongodb+srv://shisoni:shisoni@lootkamaal-wbiet.mongodb.net/test";
const DATABASE_NAME = "ShopManagement";

const app = express();

//const port = process.env.PORT || 4200;

const server = http.createServer(app);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//app.use(express.static('dist'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var database,collection1,collection2;


app.get("/api/getProducts/", (request, response) => {

    
    

     collection1.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
  
});


app.get("/api/getAllProductsNames/", (request, response) => {

    collection1.find({},{ projection: { name: 1 } }).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.send(result);
   });
 
});




app.post('/api/saveProduct', function(req, res) {
    collection1.insertOne(req.body)
    .then(result => {
    })
    .catch(error => console.error(error))
});


app.get("/api/getCustomers/", (request, response) => {

    
    

    collection2.find({}).toArray((error, result) => {
       if(error) {
           return response.status(500).send(error);
       }
       response.send(result);
   });
 
});


app.post('/api/saveCustomer', function(req, res) {
   collection2.insertOne(req.body)
   .then(result => {
   })
   .catch(error => console.error(error))
});


  
server.on('listening',function(){
    console.log('ok,server is running');
})


server.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection1 = database.collection("Products");
        collection2 = database.collection("Customers");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

    
     

});