const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/jose', (req, res) =>{
    res.send("Jose David Albancando Robles")
})

// Here I am making it to be listen
app.listen(port);
console.log("Web server is listening at port: " + port);
