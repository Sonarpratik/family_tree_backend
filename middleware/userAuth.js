const jwt = require("jsonwebtoken");
const { response } = require("../utils/Utilities");
const User = require("../routes/auth/user/model/userModel");

//@desc     Common middleware To Authenticate user Request with JWT token
//@author   Manoj
//@date     2023-Dec-18

exports.userProtect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      // return res.status(200).json({ error: "Not authorized, no token provided" });
      return response(
        res,
        null,
        "Not authorized, no token provided",
        200,
        true
      );
    }

    const decoded = jwt.decode(token, 'your_secret_key');
    console.log(decoded);
    if (!decoded || !decoded.userId) {
      // return res.status(200).json({ error: "Not authorized, invalid token" });
      return response(res, null, "Not authorized, invalid token", 200, true);
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      // return res.status(200).json({ error: "Not authorized, user not found" });
      return response(res, null, "Not authorized, user not found", 200, true);
    }

    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    req.userData = user;

    next();
  } catch (error) {
    console.error("Error in userProtect middleware:", error);
    // res.status(500).json({ error: "Internal Server Error" });
    return response(res, null, "Internal Server Error", 200, true);
  }
};

