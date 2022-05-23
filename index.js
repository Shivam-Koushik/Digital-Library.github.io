const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({
  extended:true
}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/library.html'))
  })

app.get('/LogIn', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/login.html'))
  })

app.get('/Donate', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/Donate.html'))
  })

app.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/About.html'))
  })

app.get('/Privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/privacy.html')) 
  })

mongoose.connect('mongodb://localhost:27017/usersdata',{
});

var db = mongoose.connection;

db.on('error',()=>console.log('Error in connecting to database'));
db.on('open',()=>console.log('Connected to database'));

app.post("/SignUp",(req,res)=>{
  var Name = req.body.Name;
  var Email = req.body.Email;  
  var password = req.body.password;

  var data = {
    'Name': Name,
    'Email': Email,
    'password': password
  }

  db.collection('usersdata').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log('Record Inserted Successfully');
  });

  return res.redirect('loginsuccess.html');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})