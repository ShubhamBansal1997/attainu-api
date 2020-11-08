const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()
const fs = require('fs')
const sharp = require('sharp')
const request = require('request')
const jsonpatch = require('jsonpatch')

/**
 * Used to get current logged in user detail
 */
router.get('/users/me', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

/**
 * Used to create a new user
 */
router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * Used to login
 */
router.post('/users/login', async (req, res) => {
    // Login a registered user
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * Used to logout user from a single device
 */
router.get('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.sendStatus(204)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Used to logout the user from all devices
 */
router.get('/users/me/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.sendStatus(204)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Used to resize the image to 50 x 50
 * and store into filesystem
 */
router.post('/users/thumbnail', auth, async (reqt, res) => {
    try {
        const {uri} = reqt.body
        const filename = uri.substring(uri.lastIndexOf('/') + 1).replace(/((\?|#).*)?$/, '')
        const output = `${require('uuid').v4()}.png`
        request.head(uri, (err, resp, body) => {
            request(uri).pipe(fs.createWriteStream(`public/images/${filename}`)).on('close', () => {
                sharp(`public/images/${filename}`)
                    .resize(50, 50)
                    .toFile(`public/images/${output}`)
                    .then(() => res.status(201).send({'output': `images/${output}`}))
                    .catch((e) => res.status(500).send(e))
            });
        });
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Used to update the user details
 * name, email and adress
 */
router.patch('/users/:id', auth, async (req, res) => {
    try {
        let {id} = req.params
        const user = await User.findById(id)
        let {email, name, address} = user;
        let patch = Object.keys(req.body).map((ele, index, arr) => {
            return {"op": "replace", "path": `/${ele}`, "value": req.body[ele]}
        })
        let updatedUser = jsonpatch.apply_patch({email, name, address}, patch)
        updatedUser = await User.findByIdAndUpdate(id, updatedUser)
        res.sendStatus(204)
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router
