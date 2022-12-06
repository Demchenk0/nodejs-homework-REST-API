const express = require('express')

const ctrl = require("../../controllers/contacts")

const { ctrlWrapper } = require("../../helpers")

const { validateBody, isValidId, authenticate } = require("../../middlewares")


const { schemas } = require('../../models/contacts')

// const contacts = require('../../models/contacts')

const router = express.Router()

// const Contact = require("../../models/contacts")


router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.add));

router.put("/:id", authenticate, isValidId, validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router
