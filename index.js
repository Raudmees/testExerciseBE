const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const weatherRoutes = require("./routes/weather")
const polling = require('./polling')
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next();
});


app.use("/api", weatherRoutes)

polling()


mongoose
  .connect(
    "mongodb+srv://weather123:weather4321@cluster0.u20mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => {
    app.listen(3000, function () {
      console.log("listening on 3000")
    });
  })
  .catch((err) => console.log(err))
