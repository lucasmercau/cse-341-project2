const express = require("express");
const app = express();

const mongodb = require("./data/database");
const bodyParser = require("body-parser");


const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    next();
});

app.use("/", require("./routes"));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`)}); // This will see if the port:3000 is being used or not, if not it will connect us to it
    }
});

