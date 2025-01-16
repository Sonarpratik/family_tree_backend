const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    },
    isDeleted:{
      type:Boolean,
      default: false, 
    }
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {

    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12);

  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
