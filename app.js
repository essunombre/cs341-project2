// 1 I created the express and I listened to a port
// 2 I created routes
// 3 I use 'use' to call those routes
// 4 I use controllers to add the logic that the route will use.
// 5 I create a data folder for the DB, with the connecion on env file, project, we have a connection (db name on the connection string)
// 6 I made sure to have all routes on the index, not here, here I call the router.
// 7 I make sure I add the variable env on render.
// 8 I add the allow cross origin
// 9 se swagger file fo iunstructions
// 
// g9sxQikwm5TAYpdM esnuestronombre

const express = require("express");
const app = express();
const mongodb = require("./data/database");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/jose", (req, res) => {
//   res.send("Jose David Albancando Robles");
// });

app
  .use(bodyParser.json())
  // routes will work across sites
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use("/", mainRouter.router);

mongodb.initDb((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DataBase Running at port: " + port);
  }
});

// Here I am making it to be listen
app.listen(port);
console.log("Web server is listening at port: " + port);
