var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(this.password, 14, (error, encryptedPassword) => {
      if (error)
        next(error)
      else {
        this.password = encryptedPassword;
        next();
      }
    })
  }
})

userSchema.methods.passwordVerification = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, verified) {
    if (verified)
      callback(error, verified)
    else
      callback(error)
  })
}

module.exports = mongoose.model("User", userSchema);