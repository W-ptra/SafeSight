const express = require("express");
const path = require('path');
require("dotenv").config();
const app = express();
const port = 80;
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.send("test1")
});

app.listen(port,"0.0.0.0",()=>{
    console.log(`Listening to port:${port}`);
});