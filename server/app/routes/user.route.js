const express = require('express');
const { UserService } = require('../services/user.service');
const { mustBeUser } = require('./mustBeUser.middleware');
const { upload } = require('../helpers/uploadFile');
const fs = require('fs');
const { promisify } = require('util')

const Multer = require('multer');
const { emit } = require('process');


const deleteFile = async (file) => {
    const unlink = promisify(fs.unlink);
    await unlink(file);
}

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

const userRouter = express.Router();

userRouter.post('/signup', multer.single('file'), (req, res) => {
    const { email, plainPassword, name } = req.body;
    UserService.signUp(email, plainPassword, name, req.file)
        .then(user => { res.send({ success: true, user }) })
        .catch(res.onError)
});

userRouter.post('/signin', async (req, res) => {
    const { email, plainPassword } = req.body;
    UserService.signIn(email, plainPassword)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError);
});

userRouter.post('/check', mustBeUser, (req, res) => {
    UserService.check(req.idUser)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError);
});

userRouter.put('/', mustBeUser, multer.single('file'), (req, res) => {
    const { email, name } = req.body;
    UserService.updateUser(req.idUser, email, name, req.file)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError);
})

userRouter.post('/updatePass', mustBeUser, (req, res) => {
    const { oldPassword, newPassword } = req.body;
    UserService.updatePassword(req.idUser, oldPassword, newPassword)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError);
})

userRouter.post('/updateAvatar', mustBeUser, multer.single('file'), (req, res) => {
    UserService.updateAvatar(req.idUser, req.file)
        .then(user => res.send({ success: true, user }))
        .catch(res.onError)
})

module.exports = { userRouter };