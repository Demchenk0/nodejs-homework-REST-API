const express = require('express')

const ctrl = require('../../controllers/auth')

const { ctrlWrapper } = require('../../helpers')

// ValidateBody перевырка тыло запиту
const { validateBody, authenticate } = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription))


router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

// router.patch("/avatars", authenticate, ctrlWrapper(ctrl.logout)) 

module.exports = router;