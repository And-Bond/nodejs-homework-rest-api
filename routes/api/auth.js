const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const {schemas} = require('../../models/user')
const {validateBody} = require('../../middlewares')
const {register, login, logout, current, patchSub, patchAvatar, verify, repVerify} = require('../../controllers/auth')
const {ctrlWrapper} = require('../../helpers')
const {isAuthorized} = require('../../middlewares')

const tempDir = path.join(__dirname, './temp')
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage: multerConfig
})

router.get('/users/current', isAuthorized, ctrlWrapper(current))
router.get('/users/verify/:verificationToken', ctrlWrapper(verify))
router.post('/users/register', validateBody(schemas.validateRegisterSchema), ctrlWrapper(register))
router.post('/users/login', validateBody(schemas.validateRegisterSchema), ctrlWrapper(login))
router.post('/users/logout',isAuthorized, ctrlWrapper(logout))
router.post('/users/verify', ctrlWrapper(repVerify))
router.patch('/users', isAuthorized, ctrlWrapper(patchSub))
router.patch('/users/avatars', upload.single('avatar') ,isAuthorized, ctrlWrapper(patchAvatar))



module.exports = router