const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const multer = require("multer");
const fs = require("fs");
var nodemailer = require('nodemailer');


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
// app.use(express.static(path.join(_dirname, './projimages')));

app.post('/sign-up', bodyParser.json(), (req, res) => {
    const collection = connection.db('people').collection('details');
    collection.find({email: req.body.email }).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {
            res.send({status:"failed"});
        }
        else {
            collection.insertOne(req.body, (err, result) => {
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
        if(!err && docs.length>0) {   
            
            accessString = randomStringGenerator();
            collection.updateOne({_id: docs[0]._id}, {$set: {accessString: accessString}});
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
        if (file.fieldname=='zip') {
            cb(null, file.fieldname + "-" + req.body.email + "-" + req.body.projname +".zip");
        }
        if (file.fieldname=="proj") {
            cb(null, file.fieldname + "-" + req.body.email + "-" + req.body.projname + "-" +String(req.cnt++) +".jpg");
        }
    }

})

var uploadgetter = multer({storage:storage});


app.post('/add-project', (req, res, next) => {
    req.cnt=0;
    req.exists=true
    next();
}, uploadgetter.fields([{name: "proj", maxCount:5}, {name:"zip", maxCount:1}]), (req, res) => {
    
    const collection = connection.db('people').collection('projects');
    req.body.likes=0;
    req.body.comments=[];

    var wordstart = 0;
    var a=[];
    for (var i=0; i<req.body.projtags.length;i++) {
        if (req.body.projtags[i]==' ' || req.body.projtags[i]==','){
            if (req.body.projtags.slice(wordstart, i)!=''){
                a.push(req.body.projtags.slice(wordstart, i))
                
            }
            wordstart=i+1;
        }

    }
    a.push(req.body.projtags.slice(wordstart, req.body.projtags.length))
    // var newstr = req.body.projtags.replace(',', ' ');
    // a=newstr.split(',');

    req.body.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    collection.insertOne({email: req.body.email, projname: req.body.projname, projdescription: req.body.projdescription, projhowtosetup: req.body.projhowtosetup, projtags: a, likes:req.body.likes, comments: req.body.comments, date: req.body.date, name: req.body.name, imgcnt: req.body.imgcnt}, (err, result) => {
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
    // console.log(req.body.email)
    // console.log(req.body.projname);
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        if (docs.length==0) {
            res.send({status:'failed'});
        }
        for (var i=0; i<docs.length; i++) {
            // console.log(docs);
            if (err) {
                res.send({status:'failed'});
            }
            else {
                if (req.body.projname==docs[i].projname) {
                    res.send(docs[i]);
                    break;
                }
            }
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
                    // console.log('found match')
                    flg=1;
                    break;
                }
            }
        }
        if (flg==1) {
            // console.log(1);
            res.send({status:"liked"});
        }
        else {
            // console.log(2);
            res.send({status:"notliked"})
        }
    })
});

app.post('/like-proj', bodyParser.json(), (req, res)=>{
    
    const collection = connection.db('people').collection('liked');
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        // console.log(docs);
        var flg=0;
        // console.log(docs);
        for (var i=0;i<docs.length;i++) {
            if (docs[i].user == req.body.user) {
                if (docs[i].proj == req.body.proj) {
                    // console.log('found match')
                    flg=1;
                    break;
                }
            }
        }
        
        if (flg==1) {
            collection.deleteOne({_id:docs[i]._id}, function(err) {
                if (err) {
                    console.log("deletion failed");
                }
                // var like=-1;
                const projcoll = connection.db("people").collection("projects");
                projcoll.find({email:req.body.user, projname: req.body.proj}).toArray((err, changelike)=>{
                    // console.log(changelike);
                    // console.log(like);
                    projcoll.updateOne({_id: changelike[0]._id}, {$set: {likes: changelike[0].likes-1}});
                });
                // console.log("deleting");
                res.send({status:"unliked"})
            });
        }
        else {
            collection.insertOne(req.body, (err, result) => {
                if (err) {
                    res.send({status: "failed"});
                }
                else {
                    const projcoll = connection.db("people").collection("projects");
                    projcoll.find({email:req.body.user, projname: req.body.proj}).toArray((err, changelike)=>{
                        // console.log(changelike);
                        // console.log(like);
                        projcoll.updateOne({_id: changelike[0]._id}, {$set: {likes: changelike[0].likes+1}});
                    });
                    // console.log("adding");
                    // var like=1;
                    res.send({status: "liked"});
                }
            });
        }
    })
    
})

app.post('/get-comment', bodyParser.json(), (req, res)=>{
    // console.log(req.body);
    const collection = connection.db('people').collection('projects');
    collection.find({email:req.body.email, projname:req.body.projname}).toArray((err, docs)=>{
    // console.log(docs[0]);
    if (!err) {
        // console.log(req.body.comment);
        collection.updateOne({_id:docs[0]._id}, {$push:{comments:req.body.comment}});
        res.send({status:"got"});
    }
    else {
        res.send({status:"didnt get"});
        }
    })
})

app.post('/get-image', bodyParser.json(), (req, res)=>{
    // console.log(req.body)
    var imageBytes = fs.readFileSync(`./projimages/proj-${req.body.email}-${req.body.projname}-${req.body.no-1}.jpg`);
    // ame + "-" + req.body.email + "-" + req.body.projname + "-" +String(req.cnt++) +".jpg"
    
    res.send({data:imageBytes})
})

app.post('/get-projects',bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('projects');
    var tobesent=[];
    if (req.body.search=='false') {
        
        // console.log(collection);
        // console.log(1);
        collection.find({email:req.body.email}).toArray((err, docs)=>{
            if (docs.length/8!=0) {
                var pages=Math.floor(docs.length/8) + 1;
            }
            else{
                var pages=Math.floor(docs.length/8)
            }
            var end= 0;
            var revdocs = docs.reverse();
            if ((req.body.page)*8<docs.length){
                end=req.body.page*8;
            }
            else{
                end=docs.length;
            }
            
            var tobesent = revdocs.slice((req.body.page-1)*8, end);
            if (tobesent.length>0) {
                res.send({data:tobesent, status:"ok", pages:pages});
            }
            else {
                res.send({status:"failed"});
            }
        })
    }
    if (req.body.search=='true') {
        if (req.body.searchterm!=''){
            collection.find().toArray((err, docs)=>{
                var tobesent=[];
                var terms = req.body.searchterm.split(' ');
                // console.log(terms)
                // console.log(terms);
                for (var i=0; i<docs.length;i++) {
                    for (var j=0; j<terms.length; j++) {
                        for (var k=0; k<docs[i].projtags.length; k++) {
                            if (terms[j]==docs[i].projtags[k]) {
                                var flg=0;
                                for (l=0; l<tobesent.length; l++){
                                    if (tobesent[l]==docs[i]){
                                        flg=1;
                                        break;
                                    }
                                }
                                if (flg==0) {
                                    // console.log(docs[i])
                                    tobesent.push(docs[i]);
                                }
                            }
                        }
                    }
                }
                tobesent.sort((a, b)=>{
                    return (b.likes-a.likes);
                })

                if (tobesent.length/8!=0) {
                    var pages=Math.floor(tobesent.length/8) + 1;
                }
                else{
                    var pages=Math.floor(tobesent.length/8)
                }
                var end= 0;
                if ((req.body.page)*8<tobesent.length){
                    end=req.body.page*8;
                }
                else{
                    end=tobesent.length;
                }
                tobesent = tobesent.slice((req.body.page-1)*8, end);
                if (tobesent.length>0){
                    res.send({data:tobesent, status:"ok", pages:pages});
                }
                else {
                    res.send({status:"failed"})
                }
            })
        }
        else {
            collection.find().toArray((err, docs)=>{
                tobesent=docs.sort((a, b)=>{
                    return b.likes-a.likes;
                })
                if (tobesent.length/8!=0) {
                    var pages=Math.floor(tobesent.length/8) + 1;
                }
                else{
                    var pages=Math.floor(tobesent.length/8)
                }
                var end= 0;
                if ((req.body.page)*8<tobesent.length){
                    end=req.body.page*8;
                }
                else{
                    end=tobesent.length;
                }
                
                
                tobesent = tobesent.slice((req.body.page-1)*8, end);
                if (tobesent.length>0) {
                    // console.log(pages)
                    res.send({data:tobesent, status:"ok", pages:pages});
                }
                else {
                    res.send({status:"failed"});
                }
            })
        }
    }
})

function sendMail(from, appPassword, to, subject,  htmlmsg)
{
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {
             //  user:"weforwomen01@gmail.com",
             //  pass:""
             user:from,
              pass:appPassword
              
    
            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log('Email sent:'+info.response);
      }
    });
}

app.post('/change-password', bodyParser.json(), (req, res)=>{
    // console.log(1);
    const collection = connection.db('people').collection('details');
    collection.find({email:req.body.email}).toArray((err, docs)=>{
        if (docs.length>0) {
            // console.log(1);
            var forpass = connection.db('people').collection('changepassword');
            forpass.find({email:req.body.email}).toArray((err, ent)=>{
                // console.log(1);
                var passstr = randomStringGenerator()
                if (ent.length>0) {
                    forpass.updateOne({_id: ent[0]._id}, {$set:{passString: passstr}});
                }
                else {
                    forpass.insertOne({email: req.body.email, passString: passstr});
                }
                if (!err) {
                    sendMail("conf437@gmail.com", "jttuhxskvcgzqiyk" , `${req.body.email}`, "Change Password at project chapoo.com", `Following is the link to rest your password - <a href="http://localhost:4200/changepassword?user=${req.body.email}&passString=${passstr}">Reset Password</a>` )
                    
                }
            })
        }
        res.send({data:"invalid"})
    })
})

app.post('/get-new-password', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('changepassword');
    collection.find({email:req.body.email, passString: req.body.passString}).toArray((err, docs)=>{
        // console.log(req.body);
        var tempstr = randomStringGenerator();
        if (docs.length>0) {
            const forpass = connection.db('people').collection('details');
            forpass.find({email:req.body.email}).toArray((err, ent)=>{
                // console.log(req.body.password);
                forpass.updateOne({_id: ent[0]._id}, {$set:{password: req.body.password}})
                forpass.updateOne({_id: ent[0]._id}, {$set:{accessString: ''}})
                collection.deleteOne({_id:docs[0]._id})
                res.send({status:"ok"});
            })
        }
        else {
            res.send({status:"failed"});
        }

    })
})

app.post('/search-projects', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('projects');
    console.log(1);
    // collection.toArray((err, docs)=>{
    //     console.log(docs);
    //     res.send({a:1});
    // })
    // console.log(collection);
})

app.post('/download-zip', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('details');
    collection.find({accessString:req.body.accessString}).toArray((err, docs)=>{
        if (docs.length>0) {
            var imgbytes = fs.readFileSync('./projimages/zip-'+req.body.user+'-'+req.body.projname+'.zip');
            res.send({data: imgbytes, ran:randomStringGenerator()})
        }
        else {
            res.send({status:"failed"});
        }
    })
})

app.post('/delete-project', bodyParser.json(), (req, res)=>{
    const collection = connection.db('people').collection('details');
    collection.find({email: req.body.email,accessString:req.body.accessString}).toArray((err, docs)=>{
        if (docs.length>0) {
            var proj = connection.db('people').collection('projects');
            // console.log(req.body.projname)
            proj.find({email:req.body.email, projname:req.body.projname}).toArray((err, ent)=>{
                proj.deleteOne({_id:ent[0]._id});
            })
            var likes = connection.db('people').collection('liked');
            likes.find({user:req.body.email, proj:req.body.projname}).toArray((err, l)=>{
                for (var v=0; v<l.length; v++) {
                    likes.deleteOne({_id:l[v]._id})
                }
            })
            res.send({status:"ok"});
        }
        else {
            res.send({status:"failed"});
        }
    
})})

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
