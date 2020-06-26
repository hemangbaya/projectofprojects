const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const multer = require("multer");
const fs = require("fs");


var client = new MongoClient('mongodb+srv://user_0:user_0_password@cluster0-2mqcw.mongodb.net/people?retryWrites=true&w=majority', {useNewUrlParser:true});
var connection;

client.connect((err, con) => {
    if (err) {
        console.log('db not connected');
    }
    else {
        connection = con;
        console.log('db people connected');
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
            // console.log(accessString);
            res.send({status:"ok", data:accessString});
            
        }
        else{
            res.send({status:"failed", data:"some error occured"});
        }
    })
});


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
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './projimages');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + req.body.email + "-" + req.body.projname + "-" +String(req.cnt++) +".jpg");
    }
})

var uploadgetter = multer({storage:storage});


app.post('/add-project', (req, res, next) => {
    req.cnt=0;
    req.exists=true
    next();
}, uploadgetter.fields([{name: "proj", maxCount:5}]), (req, res) => {
    
    const collection = connection.db('people').collection('projects');
    req.body.likes=0;
    req.body.comments=[];
    req.body.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            collection.insert(req.body, (err, result) => {
                if (err) {
                    res.send({status: "failed"});
                }
                else {
                    res.send({status: "ok"});
                }
            });
        }
);
    

app.post('/project-exist-checker', bodyParser.json(), (req, res) => {
    const collection = connection.db('people').collection('projects');
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        var flg=0;
        for (var i=0; i<docs.length; i++) {
            if (docs[i].projname == req.body.projname) {
                flg = 1;
                break;
            }
        }
        if (flg == 0) {
            res.send({status:"ok"});
        }
        else {
            res.send({status:"failed"});
        }
    })
});

app.post('/get-project', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('projects');
    collection.find({user:req.body.email, projname:req.body.projname}).toArray((err, docs)=>{
        if (err) {
            res.send({status:failed});
        }
        else {
            res.send(docs[0]);
        }
    })
})

app.post('/if-liked', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('liked');
    // console.log(req.body);
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        // console.log(docs);
        var flg=0;
        for (var i=0;i<docs.length;i++) {
            if (docs[i].user == req.body.user) {
                if (docs[i].proj == req.body.proj) {
                    console.log('found match')
                    flg=1;
                    break;
                }
            }
        }
        if (flg==1) {
            res.send({status:"liked"});
        }
        else {
            res.send({status:"notliked"})
        }
    })
});

app.post('/like-proj', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('liked');
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        // console.log(docs);
        var flg=0;
        console.log(docs);
        for (var i=0;i<docs.length;i++) {
            if (docs[i].user == req.body.user) {
                if (docs[i].proj == req.body.proj) {
                    console.log('found match')
                    flg=1;
                    break;
                }
            }
        }
        like=0;
        
        if (flg==1) {
            collection.deleteOne({_id:docs[i]._id}, function(err) {
                if (err) {
                    console.log("deletion failed");
                }
                like=-1;
                res.send({status:"unliked"})
            });
        }
        else {
            collection.insertOne(req.body, (err, result) => {
                if (err) {
                    res.send({status: "failed"});
                }
                else {
                    like=1;
                    res.send({status: "liked"});
                }
            });
        }
    })
    // const projcoll = connection.db("people").collection("projects");
    // projcoll.find({email:req.body.user, projname: req.body.proj}).toArray((err, changelike)=>{
    //     projcoll.update({_id: changelike[0]._id}, {$set: {likes: change}});
    //     collection.update({_id: docs[0]._id}, {$set: {accessString: accessString}});
    // })
})

app.listen(3000, () => {
    console.log("on 3000 currently");
})




// app.post("/add-project",(req,res,next)=>{ 
//   next(); }, uploadhelper.fields([{name:'projimage', maxCount:5}]), (req, res) => {
//     res.send({status:"ok"});
// });
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


  //     docs.find({projname: req.body.projname}).toArray((error, projects)=>{
    //         if(!error && projects.length>0) {
    //             res.send({status:"failed"});
    //         }
    //         else {
    //             req.body.likes = 0;
    //             req.body.comments = [];
    //             collection.insert(req.body, (err, result) => {
    //                 if (err) {
    //                     res.send({status: "failed"});
    //                 }
    //                 else {
    //                     res.send({status: "ok"});
    //                 }
    //                 });
    //         }
    //     }
    // )

 // collection.find({email: req.body.email}).toArray((err,docs)=>{
    //     var flg=0;
    //     for (var i=0;i<docs.length; i++) {
    //         if (docs[i].projname == req.body.projname) {
    //             flg=1;
    //             break;
    //         }
    //     }
    //     console.log(flg);
    //     if (flg==1) {
    //         req.exists=1;
    //         res.send({status:"failed"});
    //     }
    //     else {



// (req,res,next)=>{
//     req.cnt=1;
//     const collection = connection.db('people').collection('projects');
//     collection.find({email:req.body.email}).toArray((err,docs)=>{
//         if(!err && docs.length>0)
//         {
//             res.send({status:"failed"});
//         }
//         else {
//             collection.insert({
//                 email:req.body.email,
//                 projname:req.body.projname,
//                 projdescription:req.body.projdescription,
//                 projgithublink:req.body.projgithublink,
//                 projhowtosetup:req.body.projhowtosetup,
//                 projtags:req.body.projtags,

//             }, (err, result) => {
//                 if (err) {
//                     res.send({status: "failed"});
//                 }
//                 else {
//                     res.send({status: "ok"});
//                 }
//             });
//             upload.fields([{ name: 'proj', maxCount: 5 }]), (req,res)=>{ 
//                 res.send({status:"ok"});
//             }
//         }
//     });
// }
// );

// app.post("add-images", bodyParser.json(), (req, res) => {
//     upload.fields([{ name: 'proj', maxCount: 5 }]), (req,res)=>{ 
//         console
//         res.send({status:"ok"});
//     }
// })
