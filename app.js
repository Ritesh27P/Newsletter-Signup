const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'Public')))


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
})

app.post('/', (req, res) =>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log('sever started');
});

// mail_chimp_apiKey = '2a96c34904c8a55ada62be047c11c148-us10'
// audiance_id = '704e8f5cd9'