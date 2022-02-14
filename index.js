const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();
const path = require('path')

dotenv.config({path: './config.env'})

//Database Connection
const DB = process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connected Successfuly')
}).catch((err) => {
    console.log(err)
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const UserSchema = require('./Schema');

app.get("/get", async(req, res) => {
    const students = await UserSchema.find()
    res.json({students})
});

app.post("/add", async(req, res) => {
    const {name, email, dept} = req.body

    try{
        const add = UserSchema.create({
            name: name,
            email: email,
            dept: dept
        })
        await add.save()
        res.json({add})
    }catch(err){
        req.send(err)
    }
})

app.delete("/studetns/:id", async(req,res) => {
    const del = await UserSchema.findByIdAndDelete(req.params.id);
    res.json({del})
})

app.put("/update/:id", async(req, res) => {
    const {name, email, dept} = req.body
    const upd = await UserSchema.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        dept: dept
    })
    res.json({upd})
})

app.get("/single/:id", async(req,res) => {
    const single = await UserSchema.findById(req.params.id)
    res.json({single})
})

const Port = process.env.PORT || 3001

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} 

app.listen(Port, () => {
    console.log(`Server Starting At Port ${Port}`)
})