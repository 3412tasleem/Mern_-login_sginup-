import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLogin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected Successfully");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login  sucessfull", user: user });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "user not  registered  " });
    }
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully register .... please login now" });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port  =====>>>>>>>>  9002");
});
