var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/cloneEvernoteJS").then(() => console.log("Conectado com sucesso"))
  .catch(error => console.error(error));