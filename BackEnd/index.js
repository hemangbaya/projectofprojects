const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

var client = new MongoClient('mongodb+srv://user_0:user_0_password@cluster0-2mqcw.mongodb.net/people?retryWrites=true&w=majority', {useNewUrlParser:true});
var connection;

client.connect((err, con) => {
    if (err) {
        console.log('db not connected');
    }
    else {
        connection = con;
        console.log('db connected');
    }
});

const app = express();
app.use(cors());

app.post('/sign-up', bodyParser.json(), (req, res) => {
    const collection = connection.db('people').collection('details');
    collection.find({email: req.body.email }).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {
            res.send({status:"failed"});
        }
        else {
            collection.insert(req.body, (err, result) => {
                if (err) {
                    res.send({status: "failed"});
                }
                else {
                    res.send({status: "ok"});
                }
            });
        }
    });
});

function randomStringGenerator() {
    var allPossible = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLMNBVCXZ1234567890';
    var accessString ='';
    for (var i=0;i<20;i++) {
        accessString = accessString + allPossible[Math.floor(Math.random() * 62)];
    }
    return accessString;
}

app.post('/sign-in', bodyParser.json(), (req, res) => {
    const collection = connection.db('people').collection('details');
    collection.find(req.body).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {   
            accessString = randomStringGenerator();
            collection.update({_id: docs[0]._id}, {$set: {accessString: accessString}});
            res.send({status:"ok", data:accessString});
        }
        else{
            res.send({status:"failed", data:"some error occured"});
        }
    })
});

// app.post('/login-check', bodyParser.json(), (req, res) => {
//     const collection = connection.db('people').collection('details');
//     collection.find({accessString: req.body.accessString}).toArray((err,docs)=>{
//         if(!err && docs.length>0)
//         {   
//             accessString = randomStringGenerator();
//             collection.update({_id: docs[0]._id}, {$set: {access_str: accessString}});
//             res.send({status:"ok", data:"lkjh"});
//         }
//         else{
//             res.send({status:"failed", data:"some error occured"});
//         }
//     })
// });

app.post('/login-check', bodyParser.json(), (req, res) => {
    const collection = connection.db('people').collection('details');
    collection.find({accessString: req.body.accessString}).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {
            res.send({status:"ok", data:{name: docs[0].name, email: docs[0].email} });
        }
        else {
            res.send({status:"failed", data:"some error occured"});
        }
    })
})

app.listen(3000, () => {
    console.log("on 3000 currently");
})