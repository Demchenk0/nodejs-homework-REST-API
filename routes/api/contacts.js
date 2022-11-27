const express = require('express')
const createError = require('../../helpers/createError')

// const contacts = require('../../models/contacts')
const Joi = require('joi');
const router = express.Router()

const Contact = require("../../models/contacts")

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),

})

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id)
    if (!result) {
      throw createError(404, 'Not found')
    }
    res.status(200).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, 'missing required name field')
    }
    const result = await Contact.create(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error);

  }
})



router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message)
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw createError(404, 'Not found')
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);

  }
})


router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = contactFavoriteShema.validate(req.body);
    if (error) {
      throw createError(400, 'missing fields')
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
      throw createError(404, 'Not found')
    }

    res.status(200).json(result)
  } catch (error) {
    next(error);

  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id)
    if (!result) {
      throw createError(404, 'Not found')

    }
    res.status(200).json({
      message: "Contact delete"
    })
  }
  catch (error) {
    next(error);

  }
})

module.exports = router
