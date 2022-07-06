var express = require("express");
var router = express.Router();
const User = require("../models/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const secretVariable = process.env.JWT_TOKEN;
const authToken = require("../middlewares/auth");

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

router.put("/", authToken, async (req, res) => {
  const { name, email } = req.body
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, "new": true }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o nome ou email!" })
  }
})

router.put("/password", authToken, async (req, res) => {
  const { password } = req.body
  try {
    let user = await User.findOne(
      { _id: req.user._id }
    )
    user.password = password
    user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a senha!" })
  }
})

router.delete("/", authToken, async (req, res) => {
  try {
    let user = await User.findOne(
      { _id: req.user._id }
    )
    await user.delete()
    res.status(200).json({ message: "Usuário deletado." })
  } catch (error) {
    res.status(500).json({ error: "Não foi possível deletar o usuário!" })
  }
})

module.exports = router;
