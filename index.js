const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// connecting with mongodb
mongoose.connect("mongodb://0.0.0.0:27017/formData")
.then(() => console.log("database connected successfully"))
.catch(() => console.log("database cannot connect"))

const UserSchema = new mongoose.Schema ({
    name: {type: String ,required: true},
    email: {type: String ,required: true},
    password: {type: String ,required: true}
});

const User = new mongoose.model("Users", UserSchema);

// backend part
app.listen(3000);

app.get('/', (req, res)=>{
    res.render('index');
})

// register user
app.post('/signup', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        // if data already existing
        const existingUser = await User.findOne({email: data.email});
        if(existingUser){
            res.send("User already existing");
        } else {
            const userdata = await User.insertMany(data);
            res.render('home');
        }

    } catch (err){
        console.log(err);
        res.redirect('/');
    }
})

// user login
app.post('/login', async (req, res) =>{
    try{
        const findUser = await User.findOne({email: req.body.email});
        if(!findUser) {
            res.send("user not found");
        } else {
            const matchPassword = await bcrypt.compare(req.body.password, findUser.password);
            if(matchPassword){
                res.render("home");
            } else {
                res.send("wrong password");
            }
        }
    } catch {
        res.send("wrong details");
    }
})

app.get("/logout", (req, res) => {
    res.redirect('/');
})
