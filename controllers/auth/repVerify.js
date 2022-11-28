const { User } = require("../../models/user");
const makeError = require("../../helpers");
const { sendEmail } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const repVerify = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({email});
  if (!user) {
    next(makeError(404));
  }
  if (user.verify) {
    next(makeError(400, "Верифікація вже була пройдена"));
  }
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a target='_blank' href='${BASE_URL}/api/auth/users/verify/${user.verificationToken}'>Link</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = repVerify;
