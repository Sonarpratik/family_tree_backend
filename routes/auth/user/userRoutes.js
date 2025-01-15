const express = require("express");
const user = express.Router();
const {
    createUser,
    getAllUseres,
    getUserById,
    getUserByUserId,
    updateUser,
    deleteUser,

} = require("./controller/userController");

user.get("/:id", getUserById);
user.put("/:id", updateUser);
user.get("/:user_id", getUserByUserId);
user.get("/", getAllUseres);
user.post("/", createUser);
user.delete("/:id", deleteUser);


module.exports = user;
