const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  userRole: {
    type: String
  },

  phoneNumber: {
    type: String
  }
});

module.exports = mongoose.model("accounts", user);