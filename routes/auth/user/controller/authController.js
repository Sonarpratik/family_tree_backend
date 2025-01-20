const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { response, handleErrorResponse } = require("../../../../utils/Utilities");
const jwt = require("jsonwebtoken");



exports.login = async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            handleErrorResponse(res, "Plz fill all data");

        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            //if it is match then it stores inside the inMatch
            const inMatch = await bcrypt.compare(password, userLogin.password);
            const tokenExpiration = 100000 * 60; // 10 minutes in seconds
            token = jwt.sign({ userId: userLogin._id, userRole: userLogin.role }, "your_secret_key", {
                expiresIn: tokenExpiration,
            });



            await userLogin.save();
            if (!inMatch) {
                handleErrorResponse(res, "Invalid Credentials",401);


            } else {
                const userToken = {
                    userToken: token,
                };
                response(res,userToken, "User Verified", 200, false);
            
                   
            }
        } else {
        handleErrorResponse(res, "Invalid Credentials",401);

        }
    } catch (error) {
        console.log(error)
        handleErrorResponse(res, "Internal server error",500);
        
    }
};
exports.getUser = async (req, res) => {
    try {
        const { _id,
            name,
            email,
            phone,
            role,
            ...extra
        } = req.userData

    response(res, { _id,
        name,
        email,
        phone,
        role
    }, "User Verified", 200, false);

       

    } catch (error) {
        console.log(error)
        response(res, null, "Internal server error", 500, true);
    }
};

    



//pratik
//pratik
//pratik
//pratik
//pratik
//sonar

exports.register = async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    const lowerEmail = email.toLowerCase()

    const user = await User.findOne({ email: lowerEmail, isDeleted: false });
    if (user) {
        response(res, null, "User already Exists", 200, true);
    } else {
        try {
            const newUser = new User({
                name,
                email: lowerEmail,
                phone,
                role,
                password,

            });

            await newUser.save();

            response(
                res,
                newUser,
                "User Created",
                200,
                false
            );
        } catch (error) {
            console.log(error)
            response(res, error, "User Registration Failed", 500, true);
        }
    }
};