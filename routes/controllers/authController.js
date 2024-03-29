const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchErrorsAsync = require("../../utils/catchAsync");
const config = require("config");
const crypto = require("crypto");
const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const sendEmail = require("../../utils/email");

const jwtSECRET = config.get("jwtSECRET");
const jwtEXPIRESIN = config.get("jwtEXPIRESIN");
const jwtCOOKIEEXPIRE = config.get("jwtCOOKIEEXPIRE");

const signToken = (id) => {
  return jwt.sign({ id }, jwtSECRET, {
    expiresIn: jwtEXPIRESIN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + jwtCOOKIEEXPIRE * 24 * 60 * 60 * 1000),
    // secure: true,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

exports.signUp = catchErrorsAsync(async (req, res, next) => {
  const newUser = await User.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // const url = `${req.protocol}://${req.get("host")}/myAccount`;
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchErrorsAsync(async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please enter your email and password", 400));
  }
  //Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Oops! Incorrect password or email", 400));
  }
  //If everything is okay send token
  createSendToken(user, 200, res);
});

exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

//Used for protected routes to make sure user is logged in and authernticated
exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.jwt) return next(new AppError("NOT LOGGED IN!"));
  // 1) Check if token exists
  if (req.cookies.jwt) {
    try {
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtSECRET);
      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();
      // 4) Check if user changed password after token was issued
      if (currentUser.changedPassword(decoded.iat)) {
        return next();
      }
      // there is a logged in user
      return res.json(currentUser);
    } catch (error) {
      return next();
    }
  }
};

exports.protect = catchErrorsAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("Your are not logged in! Please log in to get access.", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, jwtSECRET);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists"),
      401
    );
  }
  // 4) Check if user changed password after token was issued
  if (currentUser.changedPassword(decoded.iat)) {
    next(
      new AppError("User recently changed password! Please log in again"),
      401
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  next();
});

exports.forgotPassword = catchErrorsAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError("No user with that email address found."), 404);

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it users email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Click this link ${resetURL} to reset your password. This link is valid only for 10 minutes.\n If you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchErrorsAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt property for the user

  // 4) Log the user in, send jwt
  createSendToken(user, 200, res);
});

exports.updatePassword = catchErrorsAsync(async (req, res, next) => {
  //1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  //2) Check if the posted password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(
      new AppError(
        "The password you entered is not correct. To change your password you must first validate your current password. If you forgot your password please log out and follow the 'Forgot password prompt.' "
      )
    );
  }
  //3) Update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.confirmPassword;
  await user.save();
  //4) Log user in, send jwt
  createSendToken(user, 200, res);
});
