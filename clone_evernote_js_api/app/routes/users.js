var express = require("express");
var router = express.Router();
const User = require("../models/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const secretVariable = process.env.JWT_TOKEN

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })
  try {
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: "Erro registrando o usuário!" })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ error: "Email ou senha incorretos!" })
    } else {
      user.passwordVerification(password, function (error, verified) {
        if (verified) {
          const token = JWT.sign({ email }, secretVariable, { expiresIn: "7d" })
          res.json({ user: user, token: token })
        }
        else
          res.status(401).json({ error: "Email ou senha incorretos!" })
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar logar o usuário!" })
  }
})

module.exports = router;
