require("dotenv").config();
const secretVariable = process.env.JWT_TOKEN;
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const authToken = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if(token) {
    JWT.verify(token, secretVariable, (error, decoded) => {
      if(error)
        res.status(401).send("Sem autorização! O token é inválido!")
      else {
        req.email = decoded.email
        User.findOne({email: decoded.email}).then(user => {
          req.user = user
          next()
        })
        .catch(error => {
          res.status(401).send(error)
        })
      }
    })
  }
  else
    res.status(401).json({error: "Sem autorização! O token não foi encontrado!"})
}

module.exports = authToken;