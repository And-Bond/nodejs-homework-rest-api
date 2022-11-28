const { User } = require("../../models/user");
const { makeError } = require("../../helpers");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    next(makeError(404, "Ви вже зареєстровані"));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verify;
