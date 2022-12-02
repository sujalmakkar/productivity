require('dotenv').config()
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')


// CONNECT TO DATABASE
var DB;
mongoClient.connect(url=process.env.DB).then(client=>{
    DB = client.db('new')
}).catch(err=>console.log(err))
// CONNECT TO DATABASE

var secret = process.env.SECRETJWT

async function authfn(token) {
    if(token == '' || token == "null" || token == null || !token){
            console.log(token)
            return null
    }else{
        console.log(token)
        var verified = jwt.verify(token,secret)
        console.log(verified)
        var info = verified.uid
        console.log(info)
        console.log(DB)
        var exists =  await DB.collection('productivity').findOne({uid:info})
        if(exists!=null){
            return exists.uid
        }else{
            return null
        }
    }
}

module.exports = authfn