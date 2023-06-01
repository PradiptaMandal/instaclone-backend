const express = require("express");
const postController = require("./post");
const mongoose = require("mongoose");
const cors = require("cors");
const postModal = require("./post-modal");
const app = express();
app.use(cors());
mongoose.set("strictQuery", false);

app.listen(process.env.PORT || 4000, () => {
  console.log("server started at 4000");
});

app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({limit: '50mb'}));
const DB =
  "mongodb+srv://instaclone:XsqMphA0HgJXiexS@cluster0.estrjom.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to instaclone app : server side code");
});


app.post("/add", (req, res) => {
  // const {name}=req.body
  postModal
    .create({
      name: req.body.name, //name
      location: req.body.location,
      likes: req.body.likes,
      description: req.body.description,
      postImage: req.body.postImage,
      date: req.body.date,
    })
    .then(() => {
      res.status(200).send("post created successfully");
    });
});

app.get("/posts", (req, res) => {
  postModal
    .find()
    .sort({ date: -1 })
    .then((data) => {
      res.status(200).send(data);
      // console.log(data)
      // console.log(time,likes)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err);
    });
});

// middleware
app.use("/post", postController);
