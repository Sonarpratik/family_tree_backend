const express = require("express");
const userRoutes = require("../auth/user/userRoutes");
const familyNodeRoutes = require("./familyNodes/familyNodeRoutes");

const router = express.Router();


router.use("/auth", userRoutes);
router.use("/family", familyNodeRoutes);


module.exports = router;