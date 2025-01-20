const express = require("express");
const user = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUserId,
    updateUser,
    deleteUser,

} = require("./controller/userController");
const { register, login, getUser } = require("./controller/authController");
const { userProtect } = require("../../../middleware/userAuth");

user.get("/verify",userProtect, getUser);
user.post("/register", register);
user.post("/login", login);
user.get("/:id", getUserById);
user.put("/:id", updateUser);
user.get("/:user_id", getUserByUserId);
user.get("/", getAllUsers);
user.post("/", createUser);

user.delete("/:id", deleteUser);


module.exports = user;
