const express = require('express');
const app  = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

app.use("/static", express.static("public"))
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "public", "/index.html"));
});

mongoose.connect("mongodb://localhost:27017/donate", {useNewUrlParser : true}, {useUnifiedTopology : true}).then(()=>{
    console.log("conneted successfully");
}).catch((err) => {
    console.log(err);
});

const dataSchema = {
    name : String,
    state : String,
    city : String,
    email : String,
    phone : String
}

const data = mongoose.model("trial", dataSchema);

app.post("/", function(req, res) {
    let newNote = new data({
        name:req.body.name,
        state:req.body.state,
        city:req.body.city,
        email:req.body.email,
        phone:req.body.phone
    });
    console.log(newNote);
    newNote.save().then(() => console.log("saved succesfully"));
    res.redirect('/');
})


app.listen(3000, function() {
    console.log("We are listening at port 3000");
})