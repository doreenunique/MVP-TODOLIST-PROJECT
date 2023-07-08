const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const checkUser = await User.findOne({email: req.body.email});
  if(checkUser) {
    res.send({msg: "account already exists"});
    return
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      let user = {email: req.body.email, password: hash};
      let newUser = await User.create(user);
      let token = jwt.sign({id: newUser._id}, "athens");
      res.send({token});
    });
  });
}

const login = async (req, res) => {
  let user = await User.findOne({email: req.body.email});
  if(user) {
    bcrypt.compare(req.body.password, user.password, (err, result)=>{
      if(result) {
        let token = jwt.sign({id: user._id}, "athens");
        res.send({token});
      } else {
        res.send({msg: "incorrect password"})
      }
    })
  } else {
    res.send({msg: "incorrect account"})
  }
}

const verify = async (req, res) => {
  if(!req.body.token) {
    res.send({msg: false});
  }
  try {
    let payload = jwt.verify(req.body.token, "athens");
    if(payload) {
      let user = await User.findOne({_id: payload.id});
      if(user) {
        let token = jwt.sign({id: user._id}, "athens");
        res.send(user);
      } else {
        res.send({msg: "Invalid token"});
      }
    } else {
      res.send({msg: "Invalid token"});
    }
  } catch (error) {
    res.send({msg: "Invalid token"});
  }
}

module.exports = {
  signup,
  login,
  verify
}