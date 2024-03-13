const { User } = require("../../models/user");
const { makeError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nanoid = require('nanoid')
require('dotenv').config()

const {BASE_URL} = process.env

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const result = await User.find({ email });
  
  if (result === []) {
    next(makeError(409, "Email in use"));
  }
  const verificationToken = nanoid.nanoid()
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  await User.create({ email, password: hashedPassword, subscription, avatarUrl, verificationToken });

  await sendEmail({
    to: 'aloxnesir@gmail.com',
    subject: 'Verify your email',
    html: `<a target='_blank' href='${BASE_URL}/api/auth/users/verify/${verificationToken}'>Link</a>`
  })

  res.json({ user: { email, subscription } }).status(201);
};

module.exports = register;
