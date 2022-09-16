const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path');
const https = require('https')

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
    console.log(email, firstName, lastName);
    console.log('hii terer......................................................')

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: req.body.fname,
                    LNAME: req.body.lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const audiance_id = '2ecbed58e4'
    const url = "https://us8.api.mailchimp.com/3.0/lists/" + audiance_id

    const options = {
        method: 'POST',
        auth: 'Ritesh27P:6e1022c2c0d2e9566284d026642da05e-us8'
    }
    
    
    const request = https.request(url, options, (response)=>{
        response.on('data', (data) =>{
            console.log(JSON.parse(data));
            if(JSON.parse(data).errors[1] === 1 || JSON.parse(data).errors[2] === 1){
                res.sendFile(__dirname + '/views/success.html')
            } else {
                res.sendFile(__dirname + '/views/failure.html')
            }
        })
    })

    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('sever started');
});

// mail_chimp_apiKey = '2a96c34904c8a55ada62be047c11c148-us10'
// audiance_id = '704e8f5cd9'