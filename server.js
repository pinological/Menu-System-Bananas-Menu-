const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { render } = require('ejs');
const mongoose = require('mongoose');
const dbmodel = require('./model/dbmodel');
require('dotenv').config();

const app = express();

const port = 3000;

//database
const uri = process.env.URL;
mongoose.connect(uri).then((result) => {
    app.listen(port,()=>{
        console.log("Server Online and Database connected : "+port);
    })
}).catch((e) => {
    console.log(e);
})


//for body-parser
app.use(bodyParser.urlencoded({extended : false}));

//view Engine 
app.set('view engine','ejs');

//forPublic File
app.use(express.static('public'));
app.use(express.static('resource'));

//database


//login
app.get('/admin',(req,res)=>{
    res.render('admin',{ title : 'Admin Login', loginmess:""});
})

app.post('/addItem',(req,res)=>{
    const dbmodelAdd = new dbmodel({
        name : req.body.name,
        price : 'RS '+ req.body.price
    })

    dbmodel.find().then((result)=>{
        const entrise = Object.entries(result);
        var flag = true;
        for (var i = 0 ; i<entrise.length ; i++){
            if (entrise[i][1].name == req.body.name){
                flag = false
            }
        }
        if(flag){
            dbmodelAdd.save().then((result)=>{
                dbmodel.find().then((result)=>{
                    const datain = Object.entries(result);
                res.render('control',{title:'Control Menu',data:datain,message:'Data Added'});
                }).catch((e)=>{
                    console.log(e);
                })
            }).catch((e)=>{
                console.log(e)
            })
        }
        else{
            res.render('control',{title:'Control Menu',data:entrise,message:'Same Data Already Added'});
        }

    }).catch((e)=>{
        console.log(e);
    })
   
});

//loginReq
app.post('/loginReq',(req,res)=>{
    console.log(req.body)
    if(req.body.username == "bananas" & req.body.password == "admin2022"){
        console.log("Login");

        dbmodel.find().then((result)=>{
            const entrise = Object.entries(result);
            res.render('control',{title:'Control Menu',data:entrise,message:''});
        }).catch((e)=>{
            console.log(e);
        })

       
    }
    else{
        res.render('admin',{ title : 'message', loginmess : 'Either password or username is wrong'});
    }

})

//deleteItem
app.post('/deleteItem',(req,res)=>{
    dbmodel.find({name : req.body.name}).deleteOne((result)=>{
        dbmodel.find().then((result)=>{
            const entrise = Object.entries(result);
            res.render('control',{title:'Control Menu',data:entrise,message:'Item Delete'});
        }).catch((e)=>{
            console.log(e);
        })
    })
})

