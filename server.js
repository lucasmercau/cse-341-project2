const express = require("express");
const app = express();

const mongodb = require("./data/database");


const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

app.listen(port, () => {console.log(`Running on port ${port}`)}); // This will see if the port:3000 is being used or not, if not it will connect us to it