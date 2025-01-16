const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { checkSchema } = require("express-validator");
const { constants, statusCode } = require("../config/constant");

//@desc     Generate Token
//@author   Parth
//@date     2023-Dec-12
exports.generateToken = (id, ba_id = "", role_id) => {
  const jwttoken = jwt.sign({ id, ba_id, role_id }, process.env.JWT_SECRET);
  return jwttoken;
};

//@desc     Verify Token
//@author   Parth
//@date     2023-Dec-12
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return error;
  }
};

//@desc     Generate Otp
//@author   Parth
//@date     2023-Dec-12
exports.generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

//@desc     Generate Password
//@author   Parth
//@date     2023-Dec-12
exports.generatePassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  const passwordLength = 8;

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};

//@desc     Response Formatter
//@author   Parth
//@date     2023-Dec-12
exports.response = (
  res,
  data = null,
  message = constants.successful,
  status = statusCode[200],
  error = false
) => {
  return res.status(status).json({
    message,
    status,
    error,
    data,
  });
};
const response = (
  res,
  data = null,
  message = constants.successful,
  status = statusCode[200],
  error = false
) => {
  return res.status(status).json({
    message,
    status,
    error,
    data,
  });
};

//@desc     Validation Request Interface
//@author   Parth
//@date     2023-Dec-12
exports.validation = {
  register: checkSchema({
    name: {
      errorMessage: "Please enter a valid name",
      optional: false,
    },
    email: {
      errorMessage: "Please enter a valid email address",
      isEmail: true,
      optional: false,
    },
    // phone: {
    //   errorMessage: "Please enter a valid phone number",
    //   isMobilePhone: true,
    //   isLength: {
    //     options: {
    //       min: 10,
    //       max: 10,
    //     },
    //     errorMessage: "Phone number must be 10 digits long",
    //   },
    //   optional: false,
    // },
  }),
  login: checkSchema({
    email: {
      errorMessage: "Please enter a valid email address",
      isEmail: true,
      optional: false,
    },
    password: {
      errorMessage: "Please enter a valid password",
      optional: false,
    },
  }),
  sendOtp: checkSchema({
    mobile: {
      errorMessage: "Please enter a valid phone number",
      isMobilePhone: true,
      isLength: {
        options: {
          min: 10,
          max: 10,
        },
        errorMessage: "Phone number must be 10 characters long",
      },
      optional: false,
    },
  }),
  verifyOtp: checkSchema({
    mobile: {
      errorMessage: "Please enter a valid phone number",
      isMobilePhone: true,
      isLength: {
        options: {
          min: 10,
          max: 10,
        },
        errorMessage: "Mobile number must be 10 characters long",
      },
      optional: false,
    },
    otp: {
      errorMessage: "Please enter a valid otp",
      isNumeric: true,
      isLength: {
        options: {
          min: 5,
          max: 5,
        },
        errorMessage: "Otp must be 5 characters long",
      },
      optional: false,
    },
  }),
  template: checkSchema({
    name: {
      errorMessage: "Please enter a valid name",
      optional: false,
    },
    category: {
      errorMessage: "Please enter a valid category",
      optional: false,
    },
    components: {
      errorMessage: "Please enter a valid components",
      optional: false,
    },
  }),
  forgetPassword: checkSchema({
    email: {
      errorMessage: "Please enter a valid email address",
      isEmail: true,
      optional: false,
    },
    password: {
      errorMessage: "Please enter a valid password",
      optional: false,
    },
    otp: {
      errorMessage: "Please enter a valid OTP",
      optional: false,
    },
  })
};

//@desc     Generate Hash
//@author   Parth
//@date     2023-Dec-12
exports.generateHash = async (tokenString) => {
  try {
    const hash = await bcrypt.hash(tokenString, Number(process.env.SALT_VALUE));
    // console.log('Generated hash:', hash);
    return hash;
  } catch (error) {
    console.error("Error generating hash:", error);
    throw error;
  }
};

//@desc     Encrypt Token
//@author   Parth
//@date     2023-Dec-12
exports.encryptToken = (tokenString) => {
  const cipher = crypto.createCipheriv(
    process.env.TOKEN_ALGORITHM,
    process.env.TOKEN_SECRET,
    process.env.TOKEN_IV
  );
  let encodedString = cipher.update(tokenString, "utf8", "hex");
  encodedString += cipher.final("hex");
  return encodedString;
};

//@desc     Decrypt Token
//@author   Parth
//@date     2023-Dec-12
exports.decryptToken = (tokenString) => {
  const decipher = crypto.createDecipheriv(
    process.env.TOKEN_ALGORITHM,
    process.env.TOKEN_SECRET,
    process.env.TOKEN_IV
  );

  const decodedString = Buffer.concat([
    decipher.update(Buffer.from(tokenString, "hex")),
    decipher.final(),
  ]).toString();

  return decodedString;
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

exports.sendEmail = async (to, subject, text) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};


exports.handleErrorResponse = (res, error) => {
  if (error?.response) {
    // Error from the Facebook API
    return response(
      res,
      error?.response.data.error.message,
      "Error from Meta",
      error?.response.status,
      true
    );
  } else {
    // General server error
    return response(
      res,
      error?.message || "Internal Server Error",
      "Internal Server Error",
      error?.statusCode || 500,
      true
    );
  }
};