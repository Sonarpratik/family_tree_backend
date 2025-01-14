const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "admin",
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
