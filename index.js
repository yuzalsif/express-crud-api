const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) =>
  res.send("This is a response coming from the  Node API")
);

mongoose
  .connect(
    "mongodb+srv://yuseifabdillah:ZhD8DD8oo0CdclzG@experimental.32yht.mongodb.net/?retryWrites=true&w=majority&appName=Experimental"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log("Connection to the database failed", err));
