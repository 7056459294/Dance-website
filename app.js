//import modules
const express=require("express");

const app=express();

const port =80

const path=require('path');

const fs=require('fs');

const bodyparser=require('body-parser');
//npm install mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});

//mongoo create schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    address: String,
    message: String

});

const contact = mongoose.model('contact', contactSchema);

//install pug,express,init

//static file serve 
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUD SPECIFIC CONNECT------------------------------------------------------------------
// set template engine pug
app.set('view engine', 'pug')

// set template directory
app.set('views',path.join(__dirname,'views'));


//ENDPOINT----------------------------------------------------------------------------


app.get('/',(req, res)=>{
    res.render('home.pug');
});
app.get('/home',(req, res)=>{
    res.render('home.pug');
});
app.get('/Contact',(req, res)=>{
    res.render('contact.pug');
});

app.get('/join',(req, res)=>{
    res.render('contact.pug');
});
app.get('/About',(req, res)=>{
    res.render('about.pug');
});
app.get('/Services',(req, res)=>{
    res.render('sevices.pug');
});

    

    
// app.post('/Contacts',(req, res)=>{
    // console.log(req.body)
    // res.render('home.pug');
// });
// database post
app.post('/Contacts',(req, res)=>{
    var mydata=new contact(req.body)
    mydata.save()
    console.log('data save in database')
    res.render('home.pug');
});



app.listen(port,()=>{
    console.log(`this application start sucessfully on port ${port}`);
})