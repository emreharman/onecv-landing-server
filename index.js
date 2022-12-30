const express = require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require("dotenv")
dotenv.config()
const cors=require('cors')
const Form = require('./models/Form')
const PORT = process.env.PORT || 3004


//connect db
mongoose.connect(
    "mongodb+srv://emrehrmn:05101990emre.@cluster0.qdewo.mongodb.net/project-class?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      app.listen(PORT, () =>
        console.log(`DB Connection is ok, listening port:${PORT}`)
      );
    }
  );
app.get('/',(req,res)=>{
    res.send('Welcome to OneCV landing server')
})
app.use(express.json());
app.use(cors({origin: '*'}));

app.post('/get-forms',async (req,res)=>{
    try {
        const body=req.body
        if(!body.username || !body.pass){
            return res.json({status:400,message:"Yetkisiz işlem"})
        }
        if(body.username !== "emrehrmn" || body.pass !== "onecvlandingapi"){
            return res.json({status:400,message:"Yetkisiz işlem"})
        }
        const forms=await Form.find({})
        res.json({status:200,forms})
    } catch (error) {
        console.log(error)
        res.json({status:500,message:"Server'da bir hata oluştu"})
    }
})

app.post('/add-form',async (req,res)=>{
    try {
        const {body}=req
        const form=new Form({
            name:body.name,
            surname:body.surname,
            email:body.email,
            message:body.message,
            date:body.date
        })
        const savedForm=await form.save()
        res.json({status:200,message:'Form başarıyla gönderildi',savedForm})
    } catch (error) {
        console.log(error)
        res.json({status:500,message:"Server'da bir hata oluştu"})
    }
})

