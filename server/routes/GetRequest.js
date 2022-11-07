const express = require('express')
const Router= express.Router()
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const auth = require('./Auth')


// CONNECT TO DATABASE
var DB;
mongoClient.connect(url=process.env.DB).then(client=>{
    DB = client.db('new')
}).catch(err=>console.log(err))
// CONNECT TO DATABASE


Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}
var currentWeek = ''
var date = new Date()
currentWeek = date.getWeek()

console.log(currentWeek,date)

Router.use(bodyParser.json())


Router.get('/deadline',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{alldeadlines:1,_id:0}})
        console.log(inserted)
        if(inserted!=null){
            res.json(inserted)
        }
    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/todos',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{alltodos:1,_id:0}})
        console.log(inserted)
        if(inserted!=null){
            res.json(inserted)
        }
    }else{
        res.json({message:'no user logged In',status:301})
    }
})

Router.get('/dob',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{dob:1,_id:0}})
        console.log(inserted)
        if(inserted!=null){
            res.json(inserted)
        }else{
            res.json()
        }
    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/notes',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{allnotes:1,_id:0}})
        if(inserted!=null){
            res.json(inserted.allnotes)
        }else{
            res.json()
        }
    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/note/:id',auth,async(req,res)=>{
    var id = req.params.id
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{allnotes:1,_id:0}})
        console.log(inserted)
        var note = inserted.allnotes.filter(a=>a.id==id)
        if(note!=null){
            res.json(note)
        }else{
            res.json()
        }
    }else{
        res.json({message:'no user logged In'})
    }
})



Router.get('/goals',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{allgoals:1,_id:0}})
        if(inserted!=null){
            res.json(inserted)
        }
    }else{
        res.json({message:'no user logged In',status:301})
    }
})

Router.get('/letters',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{allletters:1,_id:0}})
        var duedates = []
        var now = Date.now()
        var letters = inserted.allletters.filter(a=>a.reminder > now)
        letters.map(e=>duedates.push(e.date))
        var data = {
            number:duedates.length,
            duedates:duedates
        }
        if(inserted!=null){
            res.json(data)
        }
    }else{
        res.json({message:'no user logged In',status:301})
    }
})


Router.get('/openedletters',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{allletters:1,_id:0}})
        
        var now = Date.now()

        var opened = inserted.allletters.filter(a=>a.reminder < now)


        if(inserted!=null){
            res.json(opened)
        }
    }else{
        res.json({message:'no user logged In',status:301})
    }
})


Router.get('/timer/logs',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{TimerLogs:1,_id:0}})
        console.log(inserted)
        if(inserted!=null){
            res.json(inserted.TimerLogs)
        }
    }else{
        res.json({message:'no user logged In'})
    }
})


Router.get('/stopwatch/logs',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{StopWatchLogs:1,_id:0}})
        console.log(inserted)
        if(inserted!=null){
            res.json(inserted.StopWatchLogs)
        }
    }else{
        res.json({message:'no user logged In'})
    }
})


Router.get('/score/:week',auth,async(req,res)=>{
    if(req.authenticated){
        var currentweek = req.params.week
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{weeksreport:1,_id:0}})
        var currentweekdata = inserted.weeksreport.filter(a=>a.week == currentweek)

        var totalscore = 0 

        if(currentweekdata.length<1){
            var new_week={
                week:currentweek,
                dates:[{date:currentdate,timepassed:0,score:0}]
            }

            res.json({score:0})

            var insertweek = await DB.collection('productivity').updateOne({uid:req.uid},{
                $addToSet:{
                    weeksreport:new_week
            }})
            console.log(insertweek)
        }else{
            currentweekdata[0].dates.forEach(a=>{
                totalscore+=a.score
            })
            res.json({score:totalscore})
        }

    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/time/:week/:date',auth,async(req,res)=>{
    if(req.authenticated){
        var currentdate = req.params.date
        var currentweek = req.params.week
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{weeksreport:1,_id:0}})
        var currentweekdata = inserted.weeksreport.filter(a=>a.week == currentweek)

        if(currentweekdata.length<1){
            var new_week={
                week:currentweek,
                dates:[{date:currentdate,timepassed:0,score:0}]
            }

            currentweekdata.push(new_week)

            res.json({date:currentdate,timepassed:0})


            var insertweek = await DB.collection('productivity').updateOne({uid:req.uid},{
                $addToSet:{
                    weeksreport:new_week
            }})
            console.log(insertweek)

        }else{
            var currentdatedata = currentweekdata[0].dates.filter(a=>a.date == currentdate)

            if(currentdatedata.length<1){
                var currentweekindex = inserted.weeksreport.findIndex(a=>a.week == currentweek)
                console.log(currentweekindex,'current week index 2')
                var new_date={
                    date:currentdate,
                    timepassed:0,
                    score:0
                }
                var insertdate = await DB.collection('productivity').updateOne({uid:req.uid},{
                    $addToSet:{
                        [`weeksreport.${currentweekindex}.dates`]:new_date
                }})
                console.log(insertdate)
            }

            res.json(currentdatedata[0])
    
        }
    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/time/:week',auth,async(req,res)=>{
    if(req.authenticated){
        var currentweek = req.params.week
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{weeksreport:1,_id:0}})
        var currentweekdata = inserted.weeksreport.filter(a=>a.week == currentweek)

        var totaltime = 0 

        if(currentweekdata.length<1){
            var new_week={
                week:currentweek,
                dates:[{date:currentdate,timepassed:0,score:0}]
            }

            res.json({time:0})

            var insertweek = await DB.collection('productivity').updateOne({uid:req.uid},{
                $addToSet:{
                    weeksreport:new_week
            }})
            console.log(insertweek)
        }else{
            currentweekdata[0].dates.forEach(a=>{
                totaltime+=a.timepassed
            })
            var length = currentweekdata[0].dates.length
            if(length>0){
                totaltime -= currentweekdata[0].dates[length-1].timepassed
            }
            res.json({time:totaltime})
        }
    }else{
        res.json({message:'no user logged In'})
    }
})

Router.get('/profile',auth,async(req,res)=>{
    if(req.authenticated){
        var inserted = await DB.collection('productivity').findOne({uid:req.uid},{projection:{email:1,_id:0}})
        
        var split  = inserted.email.split('@')
        var username = split[0]

        console.log(inserted)
        if(inserted!=null){
            res.json({username:username})
        }
    }else{
        res.json({message:'no user logged In',status:302})
    }
})



module.exports = Router