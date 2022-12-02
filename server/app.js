const express = require('express')
const app = express()
var cookie = require("cookie")
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser'); 
const path = require('path');
const newUser = require("./routes/newUser")
const verifyMail = require("./routes/verifyMail")
const login = require("./routes/login")
const getData = require("./routes/GetRequest")
const postData = require("./routes/PostRequest")
const deleteUser = require("./routes/delete")
const logout = require("./routes/logout")
const authfn = require("./functions/authfn")
const fs = require('fs')
const http = require('http')
const https = require('https')

const mongoClient = require('mongodb').MongoClient;
app.use('/app', express.static('client' , { dotfiles: 'allow' }))
app.use('/sound', express.static('client/sound'))
app.use('/', express.static('client/LandingPageClient' , { dotfiles: 'allow' }))
app.use('/themes', express.static('client/themes' , { dotfiles: 'allow' }))
app.use('/login', express.static('client/LoginPageIndex',{ dotfiles: 'allow' }))
app.use('/register', express.static('client/RegisterPageIndex',{ dotfiles: 'allow' }))
  

app.use(cookieParser())
require('dotenv').config()
app.use(bodyParser.json())

const port1 = 443
const port = 80

const privateKey1 = fs.readFileSync('/etc/letsencrypt/live/myworkflow.space/privkey.pem', 'utf8');
const certificate1 = fs.readFileSync('/etc/letsencrypt/live/myworkflow.space/cert.pem', 'utf8');
const ca1 = fs.readFileSync('/etc/letsencrypt/live/myworkflow.space/chain.pem', 'utf8');
const credentials1 = {
	key: privateKey1,
	cert: certificate1,
	ca: ca1
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials1, app);

httpsServer.listen(port1, () => {
  console.log('HTTPS Server running on port 443');
});

const server = app.listen(port,()=>{
    console.log('listening on port 80')
})

const io = require('socket.io')(httpsServer);

app.set('socketio', io);

// CONNECT TO DATABASE
var DB;
mongoClient.connect(url=process.env.DB).then(client=>{
    DB = client.db('new')
}).catch(err=>console.log(err))
// CONNECT TO DATABASE


// SOCKET TO EDIT NOTE DATA
io.on('connection',async socket=>{
    var cookievalue = socket.handshake.headers.cookie?socket.handshake.headers.cookie:null
    var cookiesv = cookievalue!==null?cookie.parse(cookievalue):null
    if(cookiesv!=null){
        var token = cookiesv['auth-token']
        var uid = await authfn(token)
        socket.on('disconnect',()=>{
            console.log(socket.id)
        })
        socket.on('noteedit',async (e)=>{
            await DB.collection('productivity').updateOne({uid:uid},
                {$set:{"allnotes.$[note].data":e.data}},{
                "arrayFilters": [
                  {"note.id" : e.id},
                ]
            })
        })
    }
})


app.use('/verifyEmail',verifyMail)

app.use('/register/registeruser',newUser)

app.use('/login/loginuser',login)

app.use('/app/logoutuser',logout)

app.use('/app/deleteuser',deleteUser)

app.use('/app/getData',getData)

app.use('/app/postData',postData)




