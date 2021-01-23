const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors())

const client = require('twilio')(process.env.TWILIO_KEY_1,process.env.TWILIO_KEY_2)
app.post('/message',(req,res)=>{
   
    client.messages.create({
        body: req.body.message, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:+${req.body.to}`
    }).then(message => console.log(message))
    .catch(err=>res.status(400).json({error:err}))
    
    res.json("Message successfully sent")
})

app.get("/",(req,res)=>{
    res.status(200).json("wa_backend")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})