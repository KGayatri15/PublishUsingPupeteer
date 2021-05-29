const express  = require('express');
const app = express();
const bodyparser = require('body-parser');
//ROUTES
const functions = require('./PupeteerFunctions');
//static files
app.use('/index.js',express.static(__dirname+'/index.js'));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/index.html',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000,()=>{
    console.log("Listening to port 3000 :-)");
})
app.use('/functions',functions);