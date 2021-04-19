const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//Login and sign up
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

//Update/reset password
router.post(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

//Update user info
router.patch(
  "/updateMyAccount",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete(
  "/deleteMyAccount",
  authController.protect,
  userController.deleteMe
);

//Making sure user is authenticated when navigating through application
router.get("/auth", authController.isLoggedIn);

//Replaces current cookie with a cookie without a token which will unauthenticate user
router.get("/logout", authController.logout);

module.exports = router;
