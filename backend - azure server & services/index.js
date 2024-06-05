const express = require("express");
require("dotenv").config();
const app = express();
const port = 7001;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.listen(port,"0.0.0.0",()=>{
    console.log(`Listening to port:${port}`);
});