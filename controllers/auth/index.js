const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const patchSub = require('./patchSub')
const patchAvatar = require('./patchAvatar')
const verify = require('./verify')
const repVerify = require('./repVerify')

module.exports = {
    register,
    login,
    logout,
    current,
    patchSub,
    patchAvatar,
    verify,
    repVerify
}