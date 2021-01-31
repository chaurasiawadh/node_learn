const express = require("express");
const app = express();
require('./startup/routes')(app);
const PORT = process.env.PORT || 4000;
require('./startup/db');


app.listen(PORT, ()=>{
    console.log('server running at PORT 4000');
});
