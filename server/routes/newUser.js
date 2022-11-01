const express = require('express')
const Router= express.Router()
const USER = require('../modal/schema')
const mongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer')

// let transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'anonymousmail591@gmail.com',
//       pass: 'jodnbyprcfsnaehq'
//     }
//  });


const emailValidator = require('../functions/EmailValidator.js')

const randomNumber = require('../functions/randomNumber.js')
require('dotenv').config()


// CONNECT TO DATABASE
var DB;
mongoClient.connect(url=process.env.DB).then(client=>{
    DB = client.db('new')
}).catch(err=>console.log(err))
// CONNECT TO DATABASE


Router.post('/', async (req,res)=>{
    var credentials = req.body

    const {valid, reason, validators} = await emailValidator(credentials.email);

    if (valid){
        if(credentials.password === credentials.passwordagain){
            if(credentials.password.length >= 8){
                var exists = await DB.collection('productivity').find().toArray().then(a=>a.filter(e=>e.email == credentials.email))
    
                exists == '' && credentials.username != 'null' ? insertuser() : res.status(406).json({message:'User already Exists',status:200});
    
            }else{
                res.status(406).json({message:'Password should be of atleast 8 letters'})    
            }
        }else{
            res.status(406).json({message:'Password should match'})
        }
    }else{
        res.status(406).json({message:'Invalid Email address'})
    }

    async function insertuser(){

        var genagain = false
        var uid = 0

        while (!genagain){

            var uid = randomNumber(10000000,99999999)  //random 8 dight number

            var uidexists = await DB.collection('productivity').findOne({uid:uid})

            if(uidexists== null){
                genagain = true
                console.log('no need to generating again')
            }else{
                genagain = false
                console.log('generating again')
            }

        }


    //     const mailOptions = {
    //         from: 'anonymousmail591@gmail.com', // Sender address
    //         to: credentials.email, // List of recipients
    //         subject: 'Verify Your Email', // Subject line
    //         html: `<b><a href=http://localhost:3000/verifyEmail/${uid}>Welcome to My workflow. Verify Your Email to get started</a></b>`,
    //    };


        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(credentials.password,salt)

        await DB.collection('productivity').insertOne(new USER({email :credentials.email,password:hashedPassword,uid:uid,emailValidated:true}))
        .then(res.json({message:"Success User Created",status:200}))
        .catch(err=>console.log(err))

    //    transport.sendMail(mailOptions, function(err, info) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log(info);
    //     }
    //     });
    }
})


module.exports = Router;