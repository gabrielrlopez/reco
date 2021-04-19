const User = require("../../models/userModel");
const Profile = require("../../models/profileModel");
const catchErrorsAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.sendNewReco = catchErrorsAsync(async (req, res, next) => {
  //1) Check if current user is friends with the user they are trying to send the reco to
  const currentUser = await User.findById(req.user.id);
  const currentUserProfile = await Profile.findOne({ user: req.user.id });
  const currentUserFriends = currentUserProfile.friends.map(
    (friend) => friend.userId
  );
  if (!currentUserFriends.includes(req.body.userId)) {
    return next(
      new AppError("In order to send other users Recos you must be friends."),
      500
    );
  }
  //2)If so, send reco and push it into the receiving user's reco array and into the current users sentRecos array

  //Pushing into receiving users recos array
  await Profile.findOneAndUpdate(
    { user: req.body.userId },
    {
      $push: {
        "recos.books": {
          userId: currentUser._id,
          userName: currentUser.userName,
          userFullName: [currentUser.firstName, currentUser.lastName],
          photo: currentUser.photo,
          reco: req.body.book,
        },
      },
    }
  );

  //Pushing into current user sentRecos array
  const receivingUser = await User.findById(req.body.userId);
  await currentUserProfile.updateOne({
    $push: {
      "sentRecos.books": {
        userId: receivingUser._id,
        userName: receivingUser.userName,
        userFullName: [receivingUser.firstName, receivingUser.lastName],
        photo: receivingUser.photo,
        reco: req.body.book,
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: currentUserProfile,
  });
});

exports.deleteReco = catchErrorsAsync(async (req, res, next) => {
  const currentUserProfile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { "recos.books": { _id: req.body.recoId } } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: currentUserProfile,
  });
});

exports.markRecoAsSeen = catchErrorsAsync(async (req, res, next) => {
  const currentUserProfile = await Profile.findOneAndUpdate(
    { user: req.user.id, "recos.books._id": req.body.recoId },
    { $set: { "recos.books.$.seen": true } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: currentUserProfile,
  });
});
