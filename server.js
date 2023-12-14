const express=require('express')
const app=express();
const logger=require('morgan') // для логирования кто к нам по какому запросу стучался
const multer=require('multer') // для formdata
const passport =require('passport')

//middleware 1----
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true })); //сериализация   на уровне экспресса для того чтобы бэк понял пост запрос 
app.use(express.json())
app.use(express.static(__dirname+'/public'))



//app.use(upload.any())  парсинг формдаты


// app.get('/',(req,res)=>{
//     res.send('OK!')
// })

// app.post('/api',(req,res)=>{
//     console.log(req.body)
//     res.status(200).send('POST /api works | Success!')
// })
app.use(passport.initialize());



app.use(require('./app/auth/routes'))
app.use(require('./app/region/routes'))
app.use(require('./app/skills/routes'))
app.use(require('./app/employment-type/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resume/routes'))
app.use(require('./app/vacancy/routes'))
app.use(require('./app/applies/routes'))


app.listen (3000,()=>{
    console.log('Server is listening on port 3000')
})
